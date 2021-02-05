class Player {
  constructor() {
    this.ships = [];
    this.lives;
    this.turn = true;
    this.squares = function (x, y) {
      let playerSquares;
      let width = x;
      let height = y;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let square = new Square(width, height);
          playerSquares.push(square);
          width += SQUARESIZE;
        }
        height += SQUARESIZE;
        width = x;
      }
      return playerSquares;
    };
  }
  drawgrid = function () {
    this.squares.forEach((square) => {
      square.show();
    });
  };
}
