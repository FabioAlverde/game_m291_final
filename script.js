const ship = document.getElementById("ship");
const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");

let gameOver = false;

// Score initialisieren
score.innerText = 0;

// Sprungfunktion
function jump() {
  ship.classList.add("jump-animation");

  setTimeout(() => {
    ship.classList.remove("jump-animation");
  }, 800);
}

// Taste drücken = springen
document.addEventListener("keypress", () => {
  if (!ship.classList.contains("jump-animation") && !gameOver) {
    jump();
  }
});

// Game Loop
setInterval(() => {
  if (gameOver) return;

  // Score erhöhen
  const currentScore = parseInt(score.innerText, 10) || 0;
  score.innerText = currentScore + 2;

  // Hindernis Position prüfen
  const obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left"),
    10,
  );

  if (isNaN(obstacleLeft) || obstacleLeft < 0) {
    obstacle.style.display = "none";
  } else {
    obstacle.style.display = "block";
  }

  // Kollisionsprüfung
  const shipRect = ship.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  const isColliding =
    shipRect.left < obsRect.right &&
    shipRect.right > obsRect.left &&
    shipRect.top < obsRect.bottom &&
    shipRect.bottom > obsRect.top;

  if (isColliding && !gameOver) {
    gameOver = true;

    // Hindernis stoppen
    obstacle.style.animation = "none";

    // Schiff fällt runter
    ship.classList.add("fall-animation");
  }
}, 50);
