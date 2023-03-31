const X_CLASS = "x";
const CIRCLE_CLASS = "o";
const board = document.querySelector(".board");
const cellElements = document.querySelectorAll(".cell");
const dataWinningText = document.querySelector("[data-winning-text]");
const winOrLoseMessage = document.getElementById("winningMessage");
const restartButton = document.querySelector(".restartButton");

let circleTurn = true;

function startGame() {
  circleTurn = true;
  cellElements.forEach((cell) => {
    ///for restart game
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);

    //end for restart
    cell.addEventListener("click", (e) => handleClick(e), { once: true });
  });
  boardClassSwip();
  winOrLoseMessage.classList.remove("show");
}
startGame();
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? X_CLASS : CIRCLE_CLASS;
  placeMark(cell, currentClass);
  boardClassSwip();
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
}

function endGame(draw) {
  if (draw) {
    dataWinningText.innerText = "Draw!";
  } else {
    dataWinningText.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winOrLoseMessage.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  if (
    !cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  ) {
    cell.classList.add(currentClass);
    board.classList.add(circleTurn ? "o" : "x");
    swipTurn();
  } else {
    return;
  }
}

function swipTurn() {
  circleTurn = !circleTurn;
}

function boardClassSwip() {
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_CLASS);
  if (circleTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(CIRCLE_CLASS);
  }
}
function checkWin(currentClass) {
  const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return WINNING_PATTERN.some((winPattren) => {
    return winPattren.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

restartButton.addEventListener("click", () => {
  startGame();
});
