// LOADING SCREEN --------------------------------------------------
const loadingSection = document.getElementById("loadingScreen");
function displayLoadingScreen() {
  loadingSection.classList.add("display");
}
function hideLoadingScreen() {
  loadingSection.classList.remove("display");
}
hideLoadingScreen();
// LOADING SCREEN --------------------------------------------------

const playButton = document.getElementById("playButton");
if(playButton != null){
    playButton.addEventListener("click", function () {
        window.location.href = "play.html";
    });
}

const leaderboardButton = document.getElementById("leaderboardButton");
if(leaderboardButton != null){
    leaderboardButton.addEventListener("click", function () {
        window.location.href = "play.html";
    });
}

const logoutButton = document.getElementById("logoutButton");
if(logoutButton != null){
    logoutButton.addEventListener("click", function () {
        window.location.href = "play.html";
    });
}