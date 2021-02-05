let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
let ships_vert, ships_horz, crator, plane, hit;
let ships = [];
let ship;
const SQUARESIZE = 50;

function preload() {
  ships_vert = loadImage("assets/sprite sheet.png");
  ships_horz = loadImage("assets/sprite sheet2.png");
  crator = loadImage("assets/crator.png");
  plane = loadImage("assets/battleship.png");
  hit = loadImage("assets/hit.png");
}
function setup() {
  createCanvas(width, height);
  player = new Player(1);
  enemy = new Player(2);
  ship_types = [
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [4, 2],
  ];

  ship_types.forEach((type) => {
    player.ships.push(new Ship(0, 525, type[0], type[1]));
    enemy.ships.push(new Ship(10 * SQUARESIZE + 100, 525, type[0], type[1]));
  });

  player.ships.forEach((ship, index) => {
    ship.x = index * 100;
    ship.owner = player;
  });

  enemy.ships.forEach((ship, index) => {
    ship.x = index * 100 + 600;
    ship.owner = enemy;
  });

  squares = [];
  drawgrid(0, 0);
  drawgrid(10 * SQUARESIZE + 100, 0);
  // jet = new Jet(500, 500);
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
  // jet.show();
  // jet.move();
}

function Player(num) {
  this.num = num;
  this.ships = [];
}


function drawgrid(x, y) {
  let width = x;
  let height = y;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let square = new Square(width, height);
      squares.push(square);
      width += SQUARESIZE;
    }
    height += SQUARESIZE;
    width = x;
  }
}



function Jet(x, y) {
  this.x = x;
  this.y = y;
  this.show = function () {
    image(plane, this.x, this.y, 55, 55, 65, 150, 50, 50);
  };
  this.move = function () {
    this.y -= 5;
  };
}

function mousePressed() {
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].x < mouseX &&
      mouseX < squares[i].x + SQUARESIZE &&
      squares[i].y < mouseY &&
      mouseY < squares[i].y + SQUARESIZE
    ) {
      squares[i].bombed = true;
    }
  }
}

function mouseDragged() {
  player.ships.forEach((ship) => {
    if (
      ship.x < mouseX &&
      mouseX < ship.x + ship.length * SQUARESIZE &&
      ship.y < mouseY &&
      mouseY < ship.y + ship.length * SQUARESIZE
    ) {
      ship.x = mouseX;
      ship.y = mouseY;
    }
  });
}
