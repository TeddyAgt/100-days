const spans = document.querySelectorAll("span");
const restartButton =
  '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';
let playerTurn = "x";
let moves = 0;
let isGameOver = false;

function play(y) {
  if (y.dataset.player === "none" && !window.isGameOver) {
    y.textContent = playerTurn;
    y.dataset.player = playerTurn;
    moves++;
    playerTurn = playerTurn === "x" ? "o" : "x";
  }

  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);

  if (moves === 9 && !isGameOver) draw();
}

function checkWinner(a, b, c) {
  a--;
  b--;
  c--;

  if (
    spans[a].dataset.player === spans[b].dataset.player &&
    spans[a].dataset.player === spans[c].dataset.player &&
    spans[a].dataset.player !== "none" &&
    !isGameOver
  ) {
    spans[a].parentNode.className += " activeBox";
    spans[b].parentNode.className += " activeBox";
    spans[c].parentNode.className += " activeBox";
    gameOver(a);
  }
}

function playAgain() {
  document
    .querySelector(".alert")
    .parentNode.removeChild(document.querySelector(".alert"));
  resetGame();
  window.isGameOver = false;
  spans.forEach(
    (span) =>
      (span.parentNode.className = span.parentNode.className.replace(
        "activeBox",
        ""
      ))
  );
}

function resetGame() {
  spans.forEach((span) => {
    span.dataset.player = "none";
    span.textContent = " ";
  });
  playerTurn = "x";
}

function gameOver(a) {
  const gameOverAlertElement =
    "<b>GAME OVER </b><br><br> Player " +
    spans[a].dataset.player.toUpperCase() +
    " Wins !!! <br><br>" +
    restartButton;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = gameOverAlertElement;
  document.querySelector("body").appendChild(div);
  window.isGameOver = true;
  moves = 0;
}

function draw() {
  const drawAlertElement = "<b>DRAW !!!</b><br><br>" + restartButton;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = drawAlertElement;
  document.querySelector("body").appendChild(div);
  window.isGameOver = true;
  moves = 0;
}
