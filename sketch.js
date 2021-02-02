let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
function setup() {
  createCanvas(width, height);
  player = new Player(width / 2, height / 2);
  squares = [];
  drawgrid();
}

function draw() {
  background(5);
  ellipseMode(CENTER);
  for (let i = 0; i < squares.length; i++) {
    squares[i].show();
  }
}

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.ships = [];
}

function ship(x, y, length, width) {
  this.length = length;
  this.width = width;
  this.x = x;
  this.y = y;
  this.show = function () {};
}

function drawgrid() {
  let width = 0;
  let height = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let square = new Square(width, height);
      squares.push(square);
      width += 50;
    }
    height += 50;
    width = 0;
  }
}

function Square(x, y) {
  this.x = x;
  this.y = y;
  this.bombed = false;

  this.show = function () {
    square(x, y, 50);
    stroke(0);
    strokeWeight(4);
  };
}
