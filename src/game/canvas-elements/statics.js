export class Statics {
  constructor(heroName, enemyName, background) {
    this.canvas = document.getElementById("battle");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.heroName = heroName;
    this.enemyName = enemyName;
    this.background = background;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.ctx.save();
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "12px Fredoka One";
    this.ctx.fillText(this.heroName, this.canvas.width / 4, 20);
    this.ctx.fillText(this.enemyName, (this.canvas.width / 4) * 3, 20);
    this.ctx.restore();
  }

  drawResults(isWinner) {
    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.font = "25px Fredoka One";
    isWinner
      ? ((this.ctx.fillStyle = "yellow"),
        this.ctx.fillText("You win!", this.canvas.width / 2, 65))
      : ((this.ctx.fillStyle = "red"),
        this.ctx.fillText("You loose!", this.canvas.width / 2, 65));
    this.ctx.restore();
  }
}
