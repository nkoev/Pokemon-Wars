export class Sprite {
  constructor(x, y, image) {
    this.canvas = document.getElementById("battle");
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.x1 = x;
    this.image = image;
    this.showImage = false;
  }

  draw() {
    this.ctx.save();
    this.ctx.drawImage(this.image, this.x, this.y);
    this.ctx.restore();
  }

  drawBlinking() {
    if (this.showImage) {
      this.ctx.save();
      this.ctx.drawImage(this.image, this.x, this.y);
      this.ctx.restore();
    }
    this.showImage = !this.showImage;
  }

  move(step) {
    this.x += step;
  }

  restoreImage() {
    this.showImage = false;
  }

  restorePosition() {
    this.x = this.x1;
  }
}
