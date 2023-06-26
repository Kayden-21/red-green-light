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

const loginForm = document.getElementById("loginForm");
const errorText = document.getElementById("errorText");
const userName = document.getElementById("username");
const userPassword = document.getElementById("password");

async function login(event) {
  displayLoadingScreen();
  event.preventDefault(); // Prevent form submission from reloading the page'

  if(userName.value == "" || userPassword.value == ""){
    errorText.innerText = "Please fill in both fields.";
    hideLoadingScreen();
    return;
  }
  const username = userName.value;
  const password = userPassword.value;

  const result = await fetch(
    "/Login",
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
    sessionStorage.setItem("accessToken", response.token);  
    errorText.innerText = "Successful login";
    window.location.href = "/Home";
  }
}

loginForm.addEventListener("submit", login);