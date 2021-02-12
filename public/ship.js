function Ship(x, y, length, width) {
    this.length = length;
    this.width = width;
    this.selected = false;
    this.x = x;
    this.y = y;
    this.rotate = function () {
      const oldWidth = this.width
      this.width = this.length;
      this.length = oldWidth;
    };
    this.placed = false;
    this.show = function () {
      tint(255, 255);
      if (!this.selected){
        
        if (width == 1 && length == 2) {
          image(ships_vert, this.x, this.y, 50, 100, 0, 0, 50, 100);
        }
        if (width == 1 && length == 3) {
          image(ships_vert, this.x, this.y, 50, 150, 100, 0, 50, 150);
        }
        if (width == 1 && length == 4) {
          image(ships_vert, this.x, this.y, 50, 200, 150, 0, 50, 200);
        }
        if (width == 1 && length == 5) {
          image(ships_vert, this.x, this.y, 50, 250, 200, 0, 50, 250);
        }
        if (width == 2 && length == 4) {
          image(ships_vert, this.x, this.y, 336, 245, 250, 0);
        }
        //
        if (width == 2 && length == 1) {
          image(ships_horz, this.x, this.y, 100, 50, 150, 0, 100, 50);
        }
        if (width == 3 && length == 1) {
          image(ships_horz, this.x, this.y, 150, 50, 100, 100, 150, 50);
        }
        if (width == 4 && length == 1) {
          image(ships_horz, this.x, this.y, 200, 50, 50, 150, 200, 50);
        }
        if (width == 5 && length == 1) {
          image(ships_horz, this.x, this.y, 250, 50, 0, 200, 250, 50);
        }
        if (width == 4 && length == 2) {
          image(ships_horz, this.x, this.y, 200, 100, 50, 250, 200, 100);
        }
      } else{ //outline image if dragged
        if (width == 1 && length == 2) {
          image(ships_vert_outline, this.x, this.y, 50, 100, 0, 0, 50, 100);
        }
        if (width == 1 && length == 3) {
          image(ships_vert_outline, this.x, this.y, 50, 150, 100, 0, 50, 150);
        }
        if (width == 1 && length == 4) {
          image(ships_vert_outline, this.x, this.y, 50, 200, 150, 0, 50, 200);
        }
        if (width == 1 && length == 5) {
          image(ships_vert_outline, this.x, this.y, 50, 250, 200, 0, 50, 250);
        }
        if (width == 2 && length == 4) {
          image(ships_vert_outline, this.x, this.y, 336, 245, 250, 0);
        }
        //
        if (width == 2 && length == 1) {
          image(ships_horz_outline, this.x, this.y, 100, 50, 150, 0, 100, 50);
        }
        if (width == 3 && length == 1) {
          image(ships_horz_outline, this.x, this.y, 150, 50, 100, 100, 150, 50);
        }
        if (width == 4 && length == 1) {
          image(ships_horz_outline, this.x, this.y, 200, 50, 50, 150, 200, 50);
        }
        if (width == 5 && length == 1) {
          image(ships_horz_outline, this.x, this.y, 250, 50, 0, 200, 250, 50);
        }
        if (width == 4 && length == 2) {
          image(ships_horz_outline, this.x, this.y, 200, 100, 50, 250, 200, 100);
        }
      }
      
    };
  }
  