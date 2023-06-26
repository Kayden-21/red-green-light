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

const playButton = document.getElementById("playButton");
if(playButton != null){
    playButton.addEventListener("click", function () {
        window.location.href = "/Play";
    });
}

const leaderboardButton = document.getElementById("leaderboardButton");
if(leaderboardButton != null){
    leaderboardButton.addEventListener("click", function () {
        window.location.href = "/Leaderboard";
    });
}

async function logout(event) {
    event.preventDefault();
    displayLoadingScreen();
    sessionStorage.clear();

    const result = await fetch("/Utility/Logout");
    const response = await result.json();
    window.location.href = "/Home";
  }

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", logout);  