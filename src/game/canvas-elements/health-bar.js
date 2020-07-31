export class HealthBar {
  constructor(x, y, width, height) {
    this.canvas = document.getElementById("battle");
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.x1 = x;
    this.y1 = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "#32CD32";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  update(width) {
    this.width = width;
  }
}
