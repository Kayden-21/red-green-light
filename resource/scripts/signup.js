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

const signupButton = document.getElementById("signupButton");
const errorText = document.getElementById("errorText");
const userName = document.getElementById("username");
const userPassword = document.getElementById("password");

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

function signup(event) {
  displayLoadingScreen();

  event.preventDefault(); // Prevent form submission from reloading the page
  if(userName.value == "" || userPassword.value == ""){
    errorText.innerText = "Please fill in both fields.";
    hideLoadingScreen();
    return;
  }

  if(!hasSpecialChars(userPassword.value) || !hasUppercase(userPassword.value) || !hasLowercase(userPassword.value) || !hasNumber(userPassword.value)){
    errorText.innerText = "Please ensure your password has at least one lowercase letter, capital letter and special character.";
    hideLoadingScreen();
    return;
  }

  if(!testMinLength(userPassword.value, 10)){
    errorText.innerText = "Please ensure your password is at least 10 characters in length.";
    hideLoadingScreen();
    return;
  }

  if(!testMaxLength(userPassword.value, 255) || !testMaxLength(userName.value, 255)){
    errorText.innerText = "Please ensure your username and password are less than 255 characters in length.";
    hideLoadingScreen();
    return;
  }
  try {
    // const response = await userService.login(userName.value, userPassword.value); // user35
    // const data = await response.json();

    setTimeout(function() {
        window.location.href = "/Login";
    }, 2000); // Adjust the duration (in milliseconds) to match the shimmer effect animation duration

    errorText.innerText = "";
  }catch (error) {
      errorText.innerText = "Invalid login details.";
      hideLoadingScreen();
  }
}

signupButton.addEventListener("click", signup);