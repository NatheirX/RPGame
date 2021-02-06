let originalShipX;
let originalShipY;
let justSelected;
function mousePressed() {
  if (gameState == 1) {
    // place ships
    player.ships.forEach((ship, index) => {
      if (
        ship.x < mouseX &&
        mouseX < ship.x + ship.width * SQUARESIZE &&
        ship.y < mouseY &&
        mouseY < ship.y + ship.length * SQUARESIZE
      ) {
        ship.selected = true;
        justSelected = index;
        originalShipX = ship.x;
        originalShipY = ship.y;
      } else {
        ship.selected = false;
      }
    });
  } else if (gameState == 2) {
    //game running
    player.squares.forEach((square) => {
      if (
        square.x < mouseX &&
        mouseX < square.x + SQUARESIZE &&
        square.y < mouseY &&
        mouseY < square.y + SQUARESIZE
      ) {
        square.bombed = true;
        jet = new Jet(square.x, square.y);
        jets.push(jet);
      }
    });
  }
}

function mouseDragged() {
  player.ships.forEach((ship) => {
    if (ship.selected) {
      ship.x = mouseX;
      ship.y = mouseY;
    }
  });
}

function mouseReleased() {
  switch (gameState) {
    case 1:
      player.ships.forEach((ship) => {
        ship.selected = false;
      });
      let selectedShip = player.ships[justSelected];
      let leastDistance = Infinity;
      let targetSquare;
      player.squares.forEach((square, index) => {
        let dist = Math.hypot(
          selectedShip.x - square.x,
          selectedShip.y - square.y
        );
        if (dist < leastDistance) {
          leastDistance = dist;
          targetSquare = index;
        }
      });
      // check to see if ship fits
      if (fitsOnGrid(player.squares[targetSquare].x, player.squares[targetSquare].y, selectedShip.length, selectedShip.width) &&
      clearOfShips(player.squares[targetSquare].x, player.squares[targetSquare].y, selectedShip.length, selectedShip.width)) {
        selectedShip.x = player.squares[targetSquare].x;
        selectedShip.y = player.squares[targetSquare].y;
        selectedShip.placed = true;
        for (i = 0; i < selectedShip.length; i++) { //mark squares as having ship
          for (j = 0; j < selectedShip.width; j++) {
            player.squares[targetSquare + j + i * 10].hasShip = true;
            console.log("something")
          }
        }

      } else {
        selectedShip.x = originalShipX;
        selectedShip.y = originalShipY;
        selectedShip.selected = false;
      }
  }
}

function fitsOnGrid(x, y, length, width) { //takes in ship.x, ship.y, ship.length, ship.width
  x = Math.round(x / 50);
  y = Math.round(y / 50);
  return (x + width < 10 && y + length < 10)
}

function clearOfShips(x, y, length, width) { //takes in ship.x, ship.y, ship.length, ship.width
  let clear = true;
  x = Math.round(x / 50);
  y = Math.round(y / 50);
  for (i = 0; i < length; i++) { //mark squares as having ship
    for (j = 0; j < width; j++) {
      if (player.squares[targetSquare + j + i * 10].hasShip) {
        clear = false;
      }
    }
  }
  return clear;
}