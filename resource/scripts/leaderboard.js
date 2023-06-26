// LOADING SCREEN --------------------------------------------------
const loadingSection = document.getElementById("loadingScreen");
function displayLoadingScreen() {
    loadingSection.classList.add("display");
}
function hideLoadingScreen() {
    loadingSection.classList.remove("display");
}
displayLoadingScreen();
// END OF LOADING SCREEN -------------------------------------------

const homeButton = document.getElementById("homeButton");
if (homeButton != null) {
  homeButton.addEventListener("click", function () {
    window.location.href = "/Home";
  });
}

async function getLeaderboard(){
  const response = await fetch('/leaderboards');
  const leaderboardData = await response.json();

  for (let i = 0; i < leaderboardData.length; i++) {
    leaderboardData[i].rank = i + 1;
  }

  const leaderboardBody = document.querySelector("#leaderboard tbody");

  leaderboardData.forEach((data, index) => {
    const row = document.createElement("tr");
    if (index < 10) { // Is it okay for us to use innerHTML???? What are the security implications?
      row.innerHTML = `<td class="rank">${data.rank}</td><td>${data.leaderboard_username}</td><td>${data.leaderboard_score}</td>`;
    } else { // Add the user in red - need some more logic here to check if necessary.
      row.classList.add("user-row");
      row.innerHTML = `<td>${data.rank}</td><td>${data.leaderboard_username}</td><td>${data.leaderboard_score}</td>`;
    }
    leaderboardBody.appendChild(row);
  });
  hideLoadingScreen();
}

window.addEventListener('load', getLeaderboard());
