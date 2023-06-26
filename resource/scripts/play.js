// LOADING SCREEN --------------------------------------------------
const loadingSection = document.getElementById("loadingScreen");
function displayLoadingScreen() {
  loadingSection.classList.add("display");
}
function hideLoadingScreen() {
  loadingSection.classList.remove("display");
}
// END OF LOADING SCREEN -------------------------------------------

const counterElement = document.getElementById("counter");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const quitButton = document.getElementById("quitButton");
const trafficLight = document.getElementById("trafficLightImage");
const playSection = document.getElementById("playSection");
const resultsSection = document.getElementById("resultsSection");
const clicksResults = document.getElementById("clicksResults");
const resultsTitle = document.getElementById("resultsTitle");

let counter;
let lives;
let timeLeft;
let isRunning;
let redTimeLeft;
let greenTimeLeft;
let randomTimeInterval;
let timeToReset;
let isRed;

startButton.innerText = "Start";

function resetGame(){
  lives = 3;
  livesElement.textContent = lives;

  counter = 0;
  counterElement.textContent = counter;  

  timeLeft = 20;
  timerElement.innerText = timeLeft + " seconds";
  playSection.classList.remove("hidden");
  resultsSection.classList.add("hidden");

  startButton.classList.remove("disabled");

  redTimeLeft = 11;
  greenTimeLeft = 9;
  isRunning = false;
  isRed = true;
  resetRandomTimeInterval();
}

function resetRandomTimeInterval(){
  randomTimeInterval = Math.random() * 5;
  timeToReset = false;
  isRed = !isRed;
}

function startGame() {
  if (!isRunning) {
    resetGame();

    isRunning = true;
    counterElement.textContent = counter;
    startButton.classList.add("disabled");
    startButton.classList.remove("shimmer");

    let countdown = setInterval(function () {
      timeLeft--;
      randomTimeInterval--;
      timerElement.innerText = timeLeft + " seconds";

      if (timeLeft <= 0) {
        clearInterval(countdown);
        activateEndOfGameState();
      }

      if(isRed){
        if(redTimeLeft <= 0){
          isRed = false;
        }else{
          redTimeLeft--;
          solidTrafficLight("red");  
        }
      }else{
        if(greenTimeLeft <= 0){
          isRed = true;
        }else{
          greenTimeLeft--;
          solidTrafficLight("green");
        }
      }

      if(randomTimeInterval <= 0){
        resetRandomTimeInterval();
      }

      if(lives <= 0){
        lives = 0;
        clearInterval(countdown);
        activateEndOfGameState();
      }
    }, 1000);
  }
}

function activateEndOfGameState() {
  isRunning = false;
  playSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");
  
  if(lives > 0){
    displayLoadingScreen();
    resultsTitle.innerText = "GAME OVER - YOU WIN :)";
    solidTrafficLight("green");
    clicksResults.innerText = "SCORE: " + counter;
    sendResults();
  }else{
    resultsTitle.innerText = "GAME OVER - YOU LOSE :(";
    solidTrafficLight("red");
    clicksResults.innerText = "";
  }
  startButton.classList.remove("disabled");
  startButton.classList.add("shimmer");
  startButton.innerText = "Play Again";
}

function updateStatText(){
  livesElement.textContent = lives;
  counterElement.textContent = counter;  
}

function incrementCounter() {
  if (isRunning) {
    if(trafficLight.getAttribute('src') == "./traffic-light-red.png"){
      if(lives > 0){
        lives--;      
      }else{
        lives = 0;
      }
    }else if(trafficLight.getAttribute('src') == "./traffic-light-green.png"){
      counter++;      
    }
    updateStatText();
  }
}

async function sendResults(){
  const score = counter;
  const token = sessionStorage.getItem("accessToken");
  const urlWithParams = "/Username/GetUsername?token=" + token;
  const result = await fetch(urlWithParams);
  const resultData = await result.json();

  if(resultData.error){
    window.location.href = "/Login";
  }else{
    const username = resultData;
    const result = await fetch(
      "/leaderboards",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, score})
      }
    );
    const response = await result.json();
    if(response.error){
      hideLoadingScreen();
      // feels bad :)
    }else{
      hideLoadingScreen();
    }
  }
}

startButton.addEventListener("click", startGame);
document.addEventListener("mousedown", incrementCounter);

// NB!! NEED TO CHECK IF THIS MAKES A "DOUBLE CLICK"
document.addEventListener("touchstart", incrementCounter);
  
hideLoadingScreen();
resetGame();

function flashTrafficLight(milliseconds, color) {
  trafficLight.src = "./traffic-light-" + color + ".png";
  trafficLight.classList.add("flashing");

  setTimeout(function() {
    trafficLight.src = "./traffic-light.png";
    trafficLight.classList.remove("flashing");
  }, milliseconds);
}

function solidTrafficLight(color){
  trafficLight.src = "./traffic-light-" + color + ".png";
  trafficLight.classList.remove("flashing");
}

if(quitButton != null){
  quitButton.addEventListener("click", function () {
        window.location.href = "/Home";
    });
}