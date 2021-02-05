let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
let ships_vert, ships_horz, crator, plane, hit;
let ships = [];
let ship;
let jets = []
let jet;
let gameState = 0; //0 = modal game start; 1 = place ships, 2 = start game, 3 = game over
const SQUARESIZE = 50;

const scoreEl = document.getElementById("score");
const startGameBtn =document.getElementById("startGameBtn");
const modalEl =document.getElementById("modalEl");
const modalScoreEl = document.getElementById("modalScoreEl")


const findOpponent =document.getElementById("findOpponent");
const findOpponentBtn = document.getElementById("findOpponentBtn")


startGameBtn.addEventListener("click", () => {
  gameState = 1;
  modalEl.style.display = "none"
})

findOpponentBtn.addEventListener("click", () => {
  //ensure all ships have been assigned before you can find an opponent
  let shipsPlaced = true;
  player.ships.forEach( (ship) => {
    if (!ship.placed){
        shipsPlaced = false;
      }
  })
  console.log(shipsPlaced)
  if (shipsPlaced){
    alert("You must placed all your ships before you can find an opponent!");
    gameState = 2;
    findOpponent.style.display = "none"
  }
})

function preload() {
  ships_vert = loadImage("assets/sprite sheet.png");
  ships_horz = loadImage("assets/sprite sheet2.png");
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

  player.drawgrid();
}

function draw() {
  console.log(gameState);
  if (gameState == 0){ //modal game start
    findOpponent.style.display = "none"
    modalEl.style.display = "flex"

  } else if (gameState == 1){ //place ships
    findOpponent.style.display = "flex"
    modalEl.style.display = "none"
    background(255);
    ellipseMode(CENTER);
  
    squares.forEach((square) => {
      square.show();
    })
  
    player.ships.forEach((ship) => {
      ship.show();
    })
   

  } else if (gameState ==2){ //game running
    
    enemy.grid(10 * SQUARESIZE + 100, 0);
    enemy.ships.forEach((ship) => {
      ship.show();
    })

    jets.forEach((jet, index) => {
      if (jet.y <= -50) {
        jets.splice(index, 1);
      } else {
        jet.move();
      }
    })
  } else if (gameState ==3){ //game over
    // text("Game over", 0,0)
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
  if (gameState==1){ // place ships
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
  } else if (gameState == 2){ //game running
    player.squares.forEach((square) => {
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
    let leastDistance = Infinity;
    let targetSquare;
    player.squares.forEach( (square, index) => {
      const dist = Math.hypot(ship.x - square.x, ship.y - square.y)
      if (dist < leastDistance){
        leastDistance = dist;
        targetSquare = index;
      }
    })
    ship.x = player.squares[targetSquare].x;    
    ship.y =  player.squares[targetSquare].y;
    ship.placed = true;
    if (ship.rotate) { //handle horizontal ships
      for(i =0; i<ship.length; i++){
        if (ship.width ==2){
          player.squares[targetSquare+i + 1].hasShip = true;
        }
        player.squares[targetSquare+i].hasShip = true;
      }
    }else { //handle vertical ships
      for(i =0; i<ship.length; i++){
        if (ship.width ==2){
          player.squares[targetSquare+i*10 + 1].hasShip = true;
        }
        player.squares[targetSquare+i*10].hasShip = true;
      }
    }

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