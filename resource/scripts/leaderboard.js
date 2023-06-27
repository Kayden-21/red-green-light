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
  let rank = 1;
  for (let i = 0; i < leaderboardData.length; i++) {
    if(i > 0){
      if(leaderboardData[i].leaderboard_score == leaderboardData[i-1].leaderboard_score){
        leaderboardData[i].rank = leaderboardData[i-1].rank;
      }else{
        leaderboardData[i].rank = rank;
      }
    }else{
      leaderboardData[i].rank = rank;
    }
    rank++;
  }

  const leaderboardBody = document.querySelector("#leaderboard tbody");

  for(const data of leaderboardData){
    const row = document.createElement("tr");
    row.innerHTML = `<td>${data.rank}</td><td>${data.leaderboard_username}</td><td>${data.leaderboard_score}</td>`;
    leaderboardBody.appendChild(row);
  }
  hideLoadingScreen();
}

window.addEventListener('load', getLeaderboard());
