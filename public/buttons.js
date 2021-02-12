const scoreEl = document.getElementById("score");
const startGameBtn = document.getElementById("startGameBtn");
const modalEl = document.getElementById("modalEl");
const modalScoreEl = document.getElementById("modalScoreEl");

const findOpponent = document.getElementById("findOpponent");
const findOpponentBtn = document.getElementById("findOpponentBtn");

startGameBtn.addEventListener("click", () => {
  gameState = 1;
  modalEl.style.display = "none";
});

findOpponentBtn.addEventListener("click", () => {
  //ensure all ships have been assigned before you can find an opponent
  let shipsPlaced = true;
  player.ships.forEach((ship) => {
    if (!ship.placed) {
      shipsPlaced = false;
    }
  });
  console.log(shipsPlaced);
  if (!shipsPlaced) {
    alert("You must placed all your ships before you can find an opponent!");
  } else {
    gameState = 2;
    findOpponent.style.display = "none";
  }
});
