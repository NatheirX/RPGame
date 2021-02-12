function Jet(x, y) {
  this.x = x;
  this.y = y;
  this.show = function () {
    tint(255, 255);
    image(plane, this.x, this.y, 55, 55, 65, 150, 50, 50);
  };
  this.move = function () {
    jet.show();
    this.y -= 5;
  };
}
