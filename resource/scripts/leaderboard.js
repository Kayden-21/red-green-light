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

// SAMPLE DATA - TO REPLACE!
const leaderboardData = [
    { rank: 1, name: "Jesse", score: 500 },
    { rank: 2, name: "Thomas", score: 480 },
    { rank: 3, name: "Michael", score: 460 },
    { rank: 4, name: "Michael", score: 460 },
    { rank: 5, name: "Michael", score: 460 },
    { rank: 6, name: "Michael", score: 460 },
    { rank: 7, name: "Michael", score: 460 },
    { rank: 8, name: "Michael", score: 460 },
    { rank: 9, name: "Michael", score: 460 },
    { rank: 10, name: "Michael", score: 460 },
    { rank: 33, name: "Michael", score: 460 },
];

// might not need this if data from db is already sorted??
leaderboardData.sort((a, b) => b.score - a.score);
const leaderboardBody = document.querySelector("#leaderboard tbody");

leaderboardData.forEach((data, index) => {
    const row = document.createElement("tr");
    if (index < 10) { // Is it okay for us to use innerHTML???? What are the security implications?
        row.innerHTML = `<td class="rank">${data.rank}</td><td>${data.name}</td><td>${data.score}</td>`;
    } else { // Add the user in red - need some more logic here to check if necessary.
        row.classList.add("user-row");
        row.innerHTML = `<td>${data.rank}</td><td>${data.name}</td><td>${data.score}</td>`;
    }
    leaderboardBody.appendChild(row);
});
  
const homeButton = document.getElementById("homeButton");
if(homeButton != null){
    homeButton.addEventListener("click", function () {
        window.location.href = "/Home";
    });
}