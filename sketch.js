let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
let img;

function preload() {
  img = loadImage("assets/sprite sheet.png");
}
function setup() {
  createCanvas(width, height);
  player = new Player(width / 2, height / 2);
  squares = [];
  drawgrid(0, 0);
  drawgrid(600, 0);
}

function draw() {
  background(255);
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
  this.show = function () {
    if (width == 1) {
      switch (length) {
        case 2:
          image(img, 0, 0, 50, 100, 0, 0, 50, 100);
        case 3:
          image(img, 0, 0, 50, 150, 100, 0, 50, 150);

        case 4:
          image(img, 0, 0, 50, 200, 150, 0, 50, 200);
        case 5:
          image(img, 0, 0, 50, 250, 200, 0, 50, 250);
      }
    } else {
      image(img, 0, 0, 336, 245, 200, 0);
    }
  };
}

function drawgrid(x, y) {
  let width = x;
  let height = y;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let square = new Square(width, height);
      squares.push(square);
      width += 50;
    }
    height += 50;
    width = x;
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
