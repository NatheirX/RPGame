function Player() {
  this.ships = [];
  this.lives;
  this.turn = false;
  this.squares = [];
  this.createSquares = function (x, y) {
    let width = x;
    let height = y;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let square = new Square(width, height);
        this.squares.push(square);
        width += SQUARESIZE;
      }
      height += SQUARESIZE;
      width = x;
    }
  };
  this.show = function() {
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].show()
    }
  }
}
