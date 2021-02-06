let justDragged;
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
        ship.isDragged = true;
        justDragged = index;
      } else {
        ship.isDragged = false;
        justDragged = null;
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
  player.ships.forEach((ship) => {
    ship.isDragged = false;
  });
  let leastDistance = Infinity;
  let targetSquare;
  player.squares.forEach((square, index) => {
    let dist = Math.hypot(
      player.ships[justDragged].x - square.x,
      player.ships[justDragged].y - square.y
    );
    if (dist < leastDistance) {
      leastDistance = dist;
      targetSquare = index;
    }
  });
  player.ships[justDragged].x = player.squares[targetSquare].x;
  player.ships[justDragged].y = player.squares[targetSquare].y;
  player.ships[justDragged].placed = true;
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
}
