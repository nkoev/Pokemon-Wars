export class Statics {
  constructor(heroName, enemyName, background) {
    this.node = document.getElementById("battle");
    this.ctx = this.node.getContext("2d");
    this.width = this.node.width;
    this.height = this.node.height;
    this.heroName = heroName;
    this.enemyName = enemyName;
    this.background = background;
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
    this.ctx.fillStyle = "white";
    this.ctx.font = "12px Fredoka One";
    this.ctx.fillText(this.heroName, this.node.width / 4, 20);
    this.ctx.fillText(this.enemyName, (this.node.width / 4) * 3, 20);
    this.ctx.restore();
  }

  drawResults(isWinner) {
    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.font = "25px Fredoka One";
    isWinner
      ? ((this.ctx.fillStyle = "yellow"),
        this.ctx.fillText("You win!", this.node.width / 2, 65))
      : ((this.ctx.fillStyle = "red"),
        this.ctx.fillText("You loose!", this.node.width / 2, 65));
    this.ctx.restore();
  }
}
