export class Canvas {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
  }

  drawLine(fromX, fromY, toX, toY, color = "#32CD32") {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
  }

  drawImage(image, x, y) {
    this.ctx.drawImage(image, x, y);
  }

  drawBackground(image, x, y) {
    this.ctx.drawImage(image, x, y, this.canvas.width, this.canvas.height);
  }

  insertText(text, x, y) {
    this.ctx.fillText(text, x, y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
