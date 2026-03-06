const ship = document.getElementById("ship");
const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");
const startHint = document.getElementById("start-hint");
const restartBtn = document.getElementById("restart-btn");
const highscoreEl = document.getElementById("highscore");

let gameOver = false;
let gameStarted = false;

let obstacleX = 1200;
let speed = 5;
let currentScore = 0;
let highScore = 0;

let jumping = false;
let jumpProgress = 0;

// SPRUNG START bei Leertaste
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (!gameStarted) {
      gameStarted = true;
      startHint.style.visibility = "hidden";
      gameLoop();
      return;
    }
    if (!jumping && !gameOver) {
      jumping = true;
      jumpProgress = 0;
    }
  }
});

restartBtn.addEventListener("click", () => {
  gameOver = false;
  obstacleX = 1200;
  currentScore = 0;
  jumping = false;
  jumpProgress = 0;
  score.innerText = "0";
  ship.style.transform = "translateY(0) rotate(0deg)";
  restartBtn.style.display = "none";
  gameLoop();
});

function gameLoop() {
  if (gameOver) return;

  // Hindernis bewegen über LEFT
  obstacleX -= speed;
  if (obstacleX < -60) obstacleX = 600;
  obstacle.style.left = obstacleX + "px";

  // Sprung Physik + Rotation
  if (jumping) {
    jumpProgress += 0.02;
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
    if (currentScore > highScore) highScore = currentScore;
    highscoreEl.innerText = "Highscore: " + highScore;
    restartBtn.style.display = "inline-block";
  }

  requestAnimationFrame(gameLoop);
}

// Game wartet auf Startbildschirm
