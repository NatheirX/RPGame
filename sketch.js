let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
let img;
let ships = [];
let ship;

function preload() {
  img = loadImage("assets/sprite sheet.png");
}
function setup() {
  createCanvas(width, height);
  player = new Player(1);
  enemy = new Player(2);
  ship_types = [[2, 1], [3, 1], [4, 1], [5, 1], [4, 2]];
  ship_types.forEach((type) => {
    player.ships.push(new Ship(0, 0, type[0], type[1]));
    enemy.ships.push(new Ship(600, 0, type[0], type[1]));
  });

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
  for (let i = 0; i < player.ships.length; i++) {
    player.ships[i].show();
  }
  for (let i = 0; i < enemy.ships.length; i++) {
    enemy.ships[i].show();
  }
}

function Player(num) {
  this.num = num;
  this.ships = [];
}

function Ship(x, y, length, width) {
  this.length = length;
  this.width = width;
  this.x = x;
  this.y = y;
  this.owner = null;
  this.show = function () {
    if (width == 1) {
      switch (length) {
        case 2:
          image(img, x, y, 50, 100, 0, 0, 50, 100);
        case 3:
          image(img, x, y, 50, 150, 100, 0, 50, 150);
        case 4:
          image(img, x, y, 50, 200, 150, 0, 50, 200);
        case 5:
          image(img, x, y, 50, 250, 200, 0, 50, 250);
      }
    } else {
      image(img, x, y, 336, 245, 250, 0);
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
