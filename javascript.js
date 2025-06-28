let boxes = document.querySelectorAll(".box");
let turn0 = true;
let message = document.querySelector("#msg");
let newgameBtn = document.querySelector("#newgame");

let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Box click handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turn0 ? "o" : "x";
      turn0 = !turn0;
      checkWinner();
    }
  });
});

// Check winner or draw
function checkWinner() {
  let winnerFound = false;

  winPattern.forEach((pattern) => {
    const pos1 = boxes[pattern[0]].innerText;
    const pos2 = boxes[pattern[1]].innerText;
    const pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showMessage(pos1); // pos1 = 'x' or 'o'
      disableBoxes();
      winnerFound = true;
    }
  });

  // Draw check
  if (!winnerFound) {
    let isDraw = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        isDraw = false;
      }
    });

    if (isDraw) {
      message.innerText = "It's a Draw! 🤝";
      message.style.display = "block";
    }
  }
}

// Show winner message
function showMessage(winner) {
  message.style.display = "block";
  message.innerText = `🎉 Congratulations! '${winner}' has won!`;
}

// Disable further moves
function disableBoxes() {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

// New game logic
function newgame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
  });
  turn0 = true;
  message.innerText = "Start the Game!";
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}

// Attach new game to button
newgameBtn.addEventListener("click", newgame);
