// LOADING SCREEN - - - - - - - - - - - - 
const loadingSection = document.getElementById("loadingScreen");

const loginForm = document.getElementById("loginForm");
const errorText = document.getElementById("errorText");
const userName = document.getElementById("username");
const userPassword = document.getElementById("password");


function displayLoadingScreen() {
    console.log("WELP 2.0");
    // loadingSection.classList.add("swipe");
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    console.log("welp");
    // loadingSection.classList.remove("swipe");
    loadingSection.classList.remove("display");
}

function login(event) {
    displayLoadingScreen();
  
    event.preventDefault(); // Prevent form submission from reloading the page
    if(userName.value != "" && userPassword.value != ""){
      try {
        // const response = await userService.login(userName.value, userPassword.value); // user35
        // const data = await response.json();

        setTimeout(function() {
            window.location.href = "home.html";
        }, 2000); // Adjust the duration (in milliseconds) to match the shimmer effect animation duration
  

        errorText.innerText = "";
      } catch (error) {
          errorText.innerText = "Invalid login details.";
          hideLoadingScreen();
      }
    }else{
      errorText.innerText = "Please fill in all fields.";
      hideLoadingScreen();
    }
}


loginForm.addEventListener("submit", login);