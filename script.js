const AMAZON_TAG = "crazycatvideos-20";

function appendAmazonTag(url) {
  const parsed = new URL(url);
  parsed.searchParams.set("tag", AMAZON_TAG);
  return parsed.toString();
}

document.querySelectorAll("a.amazon-link").forEach((link) => {
  link.href = appendAmazonTag(link.href);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();

const startBtn = document.getElementById("start-game");
const fish = document.getElementById("fish");
const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

let score = 0;
let timeLeft = 20;
let round = null;
let gameActive = false;

function moveFish() {
  const areaRect = gameArea.getBoundingClientRect();
  const fishRect = fish.getBoundingClientRect();
  const maxX = areaRect.width - fishRect.width - 8;
  const maxY = areaRect.height - fishRect.height - 8;
  const x = Math.max(6, Math.random() * maxX);
  const y = Math.max(6, Math.random() * maxY);
  fish.style.left = `${x}px`;
  fish.style.top = `${y}px`;
}

function endGame() {
  gameActive = false;
  clearInterval(round);
  round = null;
  startBtn.disabled = false;
  startBtn.textContent = "Play Again";
}

startBtn.addEventListener("click", () => {
  score = 0;
  timeLeft = 20;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  startBtn.disabled = true;
  startBtn.textContent = "Playing...";
  gameActive = true;
  moveFish();

  round = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
});

fish.addEventListener("click", () => {
  if (!gameActive) return;
  score += 1;
  scoreEl.textContent = score;
  moveFish();
});
