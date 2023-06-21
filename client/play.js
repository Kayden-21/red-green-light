document.addEventListener("DOMContentLoaded", function () {
    let counter = 0;
    let timeLeft = 10;
    let isRunning = false;
  
    let counterElement = document.getElementById("counter");
    let timerElement = document.getElementById("timer");
    let startButton = document.getElementById("startButton");
  
    function startGame() {
      if (!isRunning) {
        counter = 0;
        timeLeft = 10;
        isRunning = true;
        counterElement.textContent = counter;
        startButton.textContent = "Click!";
        startButton.disabled = true;
  
        let countdown = setInterval(function () {
          timeLeft--;
          timerElement.textContent = timeLeft + " seconds";
  
          if (timeLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            startButton.textContent = "Start";
            startButton.disabled = false;
          }
        }, 1000);
      }
    }
  
    function incrementCounter() {
      if (isRunning) {
        counter++;
        counterElement.textContent = counter;
      }
    }
  
    startButton.addEventListener("click", startGame);
    document.addEventListener("mousedown", incrementCounter);
    document.addEventListener("touchstart", incrementCounter);
  });
  
  flashTrafficLight(5000, "green");

function flashTrafficLight(milliseconds, color) {
  let trafficLight = document.getElementById("trafficLightImage");
  trafficLight.src = "static/traffic-light-" + color + ".png";
  trafficLight.classList.add("flashing");

  setTimeout(function() {
    trafficLight.src = "static/traffic-light.png";
    trafficLight.classList.remove("flashing");
  }, milliseconds);
}
