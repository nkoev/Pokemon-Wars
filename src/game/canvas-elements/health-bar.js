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
    this.initWidth = width;
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle =
      this.width / this.initWidth <= 0.1
        ? "red"
        : this.width / this.initWidth >= 0.5
        ? "#32CD32"
        : "yellow";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  update(width) {
    this.width = width;
  }
}
