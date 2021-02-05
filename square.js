function Square(x, y) {
    this.x = x;
    this.y = y;
    this.bombed = false;
    this.hasShip = false;
    this.show = function () {
      square(x, y, SQUARESIZE);
      stroke(0);
      fill("#1DA237");
      strokeWeight(4);
      if (this.bombed && !this.hasShip) {
        tint(255, 150);
        image(crator, this.x, this.y, SQUARESIZE, SQUARESIZE);
      }
      if (this.hasShip && this.bombed) {
        tint(255, 200);
        image(hit, this.x, this.y, SQUARESIZE, SQUARESIZE);
      }
      if (this.hasShip) {
        tint(0, 0, 255);
        image(hit, this.x, this.y, SQUARESIZE, SQUARESIZE);
      }
    };
  }