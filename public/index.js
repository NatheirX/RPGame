let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let ships_vert,
  ships_horz,
  ships_vert_outline,
  ships_horz_outline,
  crator,
  plane,
  hit;
let ships = [];
const socket = io();
let ship;
let jets = [];
let jet;
let gameState = 1; //0 = modal game start; 1 = place ships, 2 = start game, 3 = game over
const SQUARESIZE = 50;

function preload() {
  ships_vert = loadImage("assets/sprite sheet.png");
  ships_horz = loadImage("assets/sprite sheet2.png");
  ships_vert_outline = loadImage("assets/sprite sheet - outline.png");
  ships_horz_outline = loadImage("assets/sprite sheet2 - outline.png");
  crator = loadImage("assets/crator.png");
  plane = loadImage("assets/battleship.png");
  hit = loadImage("assets/hit.png");
}

function setup() {
  createCanvas(width, height);
  player = new Player();
  enemy = new Player();
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

  player.createSquares(0, 0);
  enemy.createSquares(600, 0);
}

function draw() {
  background(255);

  if (gameState == 0) {
    //modal game start
    findOpponent.style.display = "none";
    modalEl.style.display = "flex";
  } else if (gameState == 1) {
    //place ships

    findOpponent.style.display = "flex";
    modalEl.style.display = "none";

    ellipseMode(CENTER);
    player.show();

    player.ships.forEach((ship) => {
      ship.show();
    });
  } else if (gameState == 2) {
    //game running
    player.show();
    enemy.show();

    jets.forEach((jet) => {
      jet.move();
    });
  } else if (gameState == 3) {
    //game over
    // text("Game over", 0,0)
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player.ships.forEach((ship) => {
      if (
        ship.x < mouseX &&
        mouseX < ship.x + SQUARESIZE * ship.width &&
        ship.y < mouseY &&
        mouseY < ship.y + SQUARESIZE * ship.length
      ) {
        ship.rotate();
      }
    });
  }
}
