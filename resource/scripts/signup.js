// LOADING SCREEN --------------------------------------------------
const loadingSection = document.getElementById("loadingScreen");
function displayLoadingScreen() {
  loadingSection.classList.add("display");
}
function hideLoadingScreen() {
  loadingSection.classList.remove("display");
}
hideLoadingScreen();
// END OF LOADING SCREEN -------------------------------------------

const signupForm = document.getElementById("signupForm");
const errorText = document.getElementById("errorText");
const userName = document.getElementById("username");
const userPassword = document.getElementById("password");
const loadingLabel = document.getElementById("loadingLabel");

function hasSpecialChars(text){
  let specialRegex =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
  return specialRegex.test(text);
}

function hasUppercase(text){
  let uppercaseRegex = /[A-Z\s]/;
  return uppercaseRegex.test(text);
}

function hasLowercase(text){
  let lowercaseRegex = /[a-z\s]/;
  return lowercaseRegex.test(text);
}

function hasNumber(text){
  let numberRegex = /[0-9\s]/;
  return numberRegex.test(text);
}

function testMinLength(text, len){
  return text.length >= len;
}

function testMaxLength(text, len){
  return text.length <= len;
}

async function signup(event) {
  displayLoadingScreen();
  event.preventDefault(); // Prevent form submission from reloading the page

  const username = userName.value;
  const password = userPassword.value;

  if(username == "" || password == ""){
    errorText.innerText = "Please fill in both fields.";
    hideLoadingScreen();
    return;
  }

  if(!hasSpecialChars(password) || !hasUppercase(password) || !hasLowercase(password) || !hasNumber(password)){
    errorText.innerText = "Please ensure your password has at least one lowercase letter, capital letter, number and special character.";
    hideLoadingScreen();
    return;
  }

  if(!testMinLength(password, 10)){
    errorText.innerText = "Please ensure your password is at least 10 characters in length.";
    hideLoadingScreen();
    return;
  }

  if(!testMaxLength(password, 255) || !testMaxLength(username, 255)){
    errorText.innerText = "Please ensure your username and password are less than 255 characters in length.";
    hideLoadingScreen();
    return;
  }
  
  const result = await fetch(
    "/Signup",
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    }
  );
  const response = await result.json();
  if(response.error){
    errorText.innerText = response.error;
    hideLoadingScreen();
  }else{
    loadingLabel.innerText = "Successful Signup - Please Login!"
    setTimeout(() => {
      loadingLabel.innerText = "";
      hideLoadingScreen();
      window.location.href = "/Login";
    }, 3000);    
  }
}

signupForm.addEventListener("submit", signup);