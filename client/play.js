// LOADING SCREEN --------------------------------------------------
const loadingSection = document.getElementById("loadingScreen");
function displayLoadingScreen() {
  loadingSection.classList.add("display");
}
function hideLoadingScreen() {
  loadingSection.classList.remove("display");
}
// LOADING SCREEN --------------------------------------------------

let counterElement = document.getElementById("counter");
let livesElement = document.getElementById("lives");
let timerElement = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let quitButton = document.getElementById("quitButton");
let trafficLight = document.getElementById("trafficLightImage");

let counter;
let lives;
let timeLeft;
let isRunning;
let redTimeLeft;
let greenTimeLeft;
let randomTimeInterval;
let timeToReset;
let isRed;

function resetGame(){
  lives = 3;
  counter = 0;
  timeLeft = 60;
  redTimeLeft = 40;
  greenTimeLeft = 20;
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
    quitButton.classList.add("disabled");
    quitButton.classList.remove("shimmer");

    let countdown = setInterval(function () {
      timeLeft--;
      randomTimeInterval--;
      timerElement.innerText = timeLeft + " seconds";

      if (timeLeft <= 0) {
        clearInterval(countdown);
        isRunning = false;
        startButton.classList.remove("disabled");
        startButton.classList.add("shimmer");
        quitButton.classList.remove("disabled");
        quitButton.classList.add("shimmer");
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
    }, 1000);
  }
}

function incrementCounter() {
  if (isRunning) {
    if(trafficLight.getAttribute('src') == "static/traffic-light-red.png"){
      lives--;
      livesElement.textContent = lives;
    }else if(trafficLight.getAttribute('src') == "static/traffic-light-green.png"){
      counter++;
      counterElement.textContent = counter;  
    }
  }
}

startButton.addEventListener("click", startGame);
document.addEventListener("mousedown", incrementCounter);
document.addEventListener("touchstart", incrementCounter);
  

hideLoadingScreen();
resetGame();

function flashTrafficLight(milliseconds, color) {
  trafficLight.src = "static/traffic-light-" + color + ".png";
  trafficLight.classList.add("flashing");

  setTimeout(function() {
    trafficLight.src = "static/traffic-light.png";
    trafficLight.classList.remove("flashing");
  }, milliseconds);
}

function solidTrafficLight(color){
  trafficLight.src = "static/traffic-light-" + color + ".png";
  trafficLight.classList.remove("flashing");
}
