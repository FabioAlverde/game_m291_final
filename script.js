const ship = document.getElementById("ship");
const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");

let gameOver = false;

let obstacleX = 600;
let speed = 10; // Geschwindigkeit reduziert
let currentScore = 0;

let jumping = false;
let jumpProgress = 0;

// SPRUNG START
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jumping && !gameOver) {
    jumping = true;
    jumpProgress = 0;
  }
});

function gameLoop() {
  if (gameOver) return;

  // Hindernis bewegen über LEFT
  obstacleX -= speed;
  if (obstacleX < -60) obstacleX = 600;
  obstacle.style.left = obstacleX + "px";

  // Sprung Physik + Rotation
  if (jumping) {
    jumpProgress += 0.15;
    const height = Math.sin(jumpProgress * Math.PI) * 250; // hohe Sprungweite
    const rotation = jumpProgress * 360;
    ship.style.transform = `translateY(-${height}px) rotate(${rotation}deg)`;
    if (jumpProgress >= 1) {
      jumping = false;
      ship.style.transform = "translateY(0) rotate(0deg)";
    }
  }

  // Score
  currentScore += 2;
  score.innerText = currentScore;

  // Kollision prüfen
  const shipRect = ship.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  const collision =
    shipRect.left < obsRect.right &&
    shipRect.right > obsRect.left &&
    shipRect.top < obsRect.bottom &&
    shipRect.bottom > obsRect.top;

  if (collision) {
    gameOver = true;
    score.innerText += " 💥";
  }

  requestAnimationFrame(gameLoop);
}

// Game starten
gameLoop();
