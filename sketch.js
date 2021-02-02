let player;
let width = window.innerWidth - 10;
let height = window.innerHeight - 25;
function setup() {
  createCanvas(width, height);
  player = new Player(width / 2, height / 2);
}

function draw() {
  background(0);
  ellipseMode(CENTER);
  player.show();
}

function Player(x, y) {
  this.x = x;
  this.y = y;

  this.show = function () {
    fill(255);
    noStroke();
    circle(this.x, this.y, 25);
  };
}
