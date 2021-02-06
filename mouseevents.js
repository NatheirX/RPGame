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
        print("mouse is pressed");
      } else {
        ship.isDragged = false;
        print("mouse isn't pressed");
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
    print("mouse released!");
    let leastDistance = Infinity;
    let targetSquare;
    player.squares.forEach((square, index) => {
      let dist = Math.hypot(ship.x - square.x, ship.y - square.y);
      if (dist < leastDistance) {
        leastDistance = dist;
        targetSquare = index;
      }
    });
    console.log(targetSquare);
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
        player.squares[targetSquare + i * 10].hasShip = true;
      }
    }
  });
}
