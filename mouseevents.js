let originalShipX;
let originalShipY;

function mousePressed() {
  if (gameState == 1) {
    // place ships
    player.ships.forEach((ship) => {
      if (
        ship.x < mouseX &&
        mouseX < ship.x + ship.width * SQUARESIZE &&
        ship.y < mouseY &&
        mouseY < ship.y + ship.length * SQUARESIZE
      ) {
        ship.isDragged = true;
        originalShipX = ship.x;
        originalShipY = ship.y;
      } else {
        ship.isDragged = false;
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
    if (ship.isDragged) {
      ship.x = mouseX;
      ship.y = mouseY;
    }
  });
}

function mouseReleased() {
  switch (gameState) {
    case 1:
      player.ships.forEach((ship) => {
        let leastDistance = Infinity;
        let targetSquare;
        player.squares.forEach((square, index) => {
          let dist = Math.hypot(
            ship.x - square.x,
            ship.y - square.y
          );
          if (dist < leastDistance) {
            leastDistance = dist;
            targetSquare = index;
          }
        });
        // check to see if ship fits
        if (fitsOnGrid(player.squares[targetSquare].x, player.squares[targetSquare].y, ship.length, ship.width)) {
          ship.x = player.squares[targetSquare].x;
          ship.y = player.squares[targetSquare].y;
          ship.placed = true;
          if (ship.rotate) {
            //handle horizontal ships
            for (i = 0; i < ship.length; i++) {
              if (ship.width == 2) {
                player.squares[targetSquare + i + 1].hasShip = true;
              }
              player.squares[targetSquare + i].hasShip = true;
            }
          } else {
            //handle vertical ships
            for (i = 0; i < ship.length; i++) {
              if (ship.width == 2) {
                player.squares[targetSquare + i * 10 + 1].hasShip = true;
              }
              print(targetSquare);
              // player.squares[targetSquare + i * 10].hasShip = true;
            }
          }
        } else {
          ship.x = originalShipX;
          ship.y = originalShipY;
        }

        ship.isDragged = false;
      });

  }
}

function fitsOnGrid(x, y, length, width) { //takes in ship.x, ship.y, ship.length, ship.width
  x = Math.round(x / 50);
  y = Math.round(y / 50);
  return (x + width > 10 || y + length > 10)
}