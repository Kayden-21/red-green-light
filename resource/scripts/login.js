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
    // event.preventDefault(); // Prevent form submission from reloading the page'

    // if(userName.value == "" || userPassword.value == ""){
    //   errorText.innerText = "Please fill in both fields.";
    //   hideLoadingScreen();
    //   return;
    // }
    // const username = userName.value;
    // const password = userPassword.value;
  
    // try {
    //   const result = await fetch(
    //     "./Login",
    //     {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({username, password})
    //     }
    // );
    // const response = await result.json();
    // if(response.error){

    // }
    // const token = 
    

    //   setTimeout(function() {
    //       window.location.href = "/Home";
    //   }, 2000); // Adjust the duration (in milliseconds) to match the shimmer effect animation duration


    //   errorText.innerText = "";
    // } catch (error) {
    //     errorText.innerText = "Invalid login details.";
    //     hideLoadingScreen();
    // }
}

// loginForm.addEventListener("submit", login);