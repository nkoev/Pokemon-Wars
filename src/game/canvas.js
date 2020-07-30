import { context } from "./common.js";

export class Canvas {
  constructor(heroName, enemyName, background) {
    this.node = document.getElementById("battle");
    this.ctx = this.node.getContext("2d");
    this.width = this.node.width;
    this.height = this.node.height;
    this.heroName = heroName;
    this.enemyName = enemyName;
    this.background = background;
  }

  display() {
    this.node.style.display = "inline-block";
  }
  hide() {
    this.node.style.display = "none";
  }
  clear() {
    this.ctx.clearRect(0, 0, this.node.width, this.node.height);
  }

  drawStatics() {
    this.ctx.save();
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.node.width,
      this.node.height
    );
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.heroName, this.node.width / 4, 20);
    this.ctx.fillText(this.enemyName, (this.node.width / 4) * 3, 20);
    this.ctx.restore();
  }

  drawResults(isWinner) {
    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.font = "30px Arial";
    isWinner
      ? ((this.ctx.fillStyle = "yellow"),
        this.ctx.fillText("You win!", this.node.width / 2, 70))
      : ((this.ctx.fillStyle = "red"),
        this.ctx.fillText("You loose!", this.node.width / 2, 70));
    this.ctx.restore();
  }
}

export class HealthBar {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.x1 = x;
    this.y1 = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    context.save();
    context.fillStyle = "#32CD32";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }

  update(width) {
    this.width = width;
  }
}

export class Sprite {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.x1 = x;
    this.image = image;
    this.showImage = false;
  }

  draw() {
    context.save();
    context.drawImage(this.image, this.x, this.y);
    context.restore();
  }

  drawBlinking() {
    if (this.showImage) {
      context.save();
      context.drawImage(this.image, this.x, this.y);
      context.restore();
    }
    this.showImage = !this.showImage;
  }

  update(step) {
    this.x += step;
  }

  restoreImage() {
    this.showImage = false;
  }

  restorePosition() {
    this.x = this.x1;
  }
}
