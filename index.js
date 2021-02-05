let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let squares;
let ships_vert, ships_horz, crator, plane, hit;
let ships = [];
let ship;
let jets = []
let jet;
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

  squares.forEach((square) => {
    square.show();
  })

  player.ships.forEach((ship) => {
    ship.show();
    player.lives += ship.length * ship.width; //add ship size to player lives
  })

  enemy.ships.forEach((ship) => {
    ship.show();
  })


  jets.forEach((jet, index) => {
    if (jet.y <= 0) {
      jets.splice(index, 1);
    } else {
      jet.move();
    }
  })


  // count player and enemy lives


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
    jet.show();
    this.y -= 5;
  };
}

function mousePressed() {
  squares.forEach((square) => {
    if (
      square.x < mouseX &&
      mouseX < square.x + SQUARESIZE &&
      square.y < mouseY &&
      mouseY < square.y + SQUARESIZE
    ) {
      square.bombed = true;
      jet = new Jet(square.x, square.y)
      jets.push(jet)
    }
  })
}


function mousePressed() {
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
  console.log("x " + player.ships[0].x);
  console.log("mouseX " + mouseX)
  console.log("y " + player.ships[0].y);
  console.log("mouseY " + mouseY)

}


function mousePressed() {
  player.ships.forEach ( (ship) => {
    if (
      ship.x < mouseX &&
      mouseX < ship.x + ship.length * SQUARESIZE &&
      ship.y < mouseY &&
      mouseY < ship.y + ship.length * SQUARESIZE
    ) {
      ship.isDragged = true;
      print("mouse is pressed")

    } else {
          ship.isDragged = false;
          print("mouse isn't pressed")
      }
  })
}

function mouseDragged() {
  player.ships.forEach ( (ship) => {
    if (ship.isDragged){
      ship.x = mouseX;
      ship.y = mouseY;
    }
  })
}

function mouseReleased() {
  player.ships.forEach( (ship) => {
    ship.isDragged = false;
    print("mouse released!");
  })
}













function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.ships.forEach((ship) => {
      if (ship.x < mouseX && 
        mouseX < ship.x + SQUARESIZE * ship.width && 
        ship.y < mouseY && 
        mouseY < ship.y + SQUARESIZE * ship.length) {
        ship.rotate = false;
      }
    })
  } else if (keyCode === RIGHT_ARROW) {
    player.ships.forEach((ship) => {
      if (ship.x < mouseX && 
        mouseX < ship.x + SQUARESIZE * ship.width && 
        ship.y < mouseY && 
        mouseY < ship.y + SQUARESIZE * ship.length) {
        ship.rotate = true;
      }
    })
  }
}