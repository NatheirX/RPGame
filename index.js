let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
let ships_vert, ships_horz, crator;
let ships = [];
let ship;

function preload() {
  ships_vert = loadImage("assets/sprite sheet.png");
  ships_horz = loadImage("assets/sprite sheet2.png");
  crator = loadImage("assets/crator.png");
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

  // first ship horizontal
  // image(ships_horz, 0, 0, 100, 50, 150, 0, 100, 50);
  // second ship horizontal
  // image(ships_horz, 0, 0, 150, 50, 100, 100, 150, 50);
  // third ship horizontal
  // image(ships_horz, 0, 0, 200, 50, 50, 150, 200, 50);
  // forth ship horizontal
  // image(ships_horz, 0, 0, 250, 50, 0, 200, 250, 50);
  // last ship horizontal
  // image(ships_horz, 0, 0, 200, 100, 50, 250, 200, 100);
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
    // rotate(PI / 2.0);
    tint(255, 255);
    if (width == 1) {
      switch (length) {
        case 2: //(2, 1)
          // translate(width / 2, height / 2);
          image(ships_vert, x, y, 50, 100, 0, 0, 50, 100);
        case 3: //(3, 1)
          image(ships_vert, x, y, 50, 150, 100, 0, 50, 150);
        case 4: //(4, 1)
          image(ships_vert, x, y, 50, 200, 150, 0, 50, 200);
        case 5: //(5, 1)
          image(ships_vert, x, y, 50, 250, 200, 0, 50, 250);
      }
    } else if (width == 2) {
      switch (length) {
        case 5: //(5, 2)
          image(ships_vert, x, y, 336, 245, 250, 0);
      }
      //     //     }
      //     // } else if (width==3){  //(1, 3)
      //     //     image(ships_horz, x, y, 336, 245, 250, 0);
      //     // } else if (width==4){  //(1, 4)
      //     //     image(ships_horz, x, y, 336, 245, 250, 0);
      //     // } else { //width == 5
      //     //     switch(length){
      //     //       case 1: //(1, 5)
      //     //         image(ships_horz, x, y, 336, 245, 250, 0);
      //     //       case 2: //(2, 5)
      //     //         image(ships_horz, x, y, 336, 245, 250, 0);
      //     //     }
      //   }
      // }
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
    fill("#1DA237");
    strokeWeight(4);
    if (this.bombed) {
      tint(255, 150);
      image(crator, this.x, this.y, 50, 50);
    }
  };
}
