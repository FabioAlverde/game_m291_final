const ship = document.getElementById("ship");
const obstacle = document.getElementById("obstacle");
const score = document.getElementById("score");

// Score initialisieren
score.innerText = 0;

function jump() {
  ship.classList.add("jump-animation");
  setTimeout(() => {
    ship.classList.remove("jump-animation");
  }, 800);
}

document.addEventListener("keypress", () => {
  if (!ship.classList.contains("jump-animation")) {
    jump();
  }
});

setInterval(() => {
  // update score
  const currentScore = parseInt(score.innerText, 10) || 0;
  score.innerText = currentScore + 2;

  // show/hide obstacle when off-screen
  const obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left"),
    10,
  );
  if (isNaN(obstacleLeft) || obstacleLeft < 0) {
    obstacle.style.display = "none";
  } else {
    obstacle.style.display = "block";
  }

  // collision detection using bounding boxes
  const shipRect = ship.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  const isColliding =
    shipRect.left < obsRect.right &&
    shipRect.right > obsRect.left &&
    shipRect.top < obsRect.bottom &&
    shipRect.bottom > obsRect.top;

  if (isColliding) {
    score.innerText = 0;
  }
}, 50);
