export class Canvas {
  canvas = document.createElement("canvas");
  ctx = this.canvas.getContext("2d");

  constructor(background) {
    this.background = background;
    this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
  }

  appendTo(parent) {
    parent.appendChild(this.node);
  }

  setAttribute(name, value) {
    this.node.setAttribute(name, value);
  }

  drawLine(fromX, fromY, toX, toY, color = "#32CD32") {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
  }

  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  get node() {
    return this.canvas;
  }

  drawImage(image, x, y) {
    this.ctx.drawImage(image, x, y);
  }

  insertText(text, x, y, color, size, align) {
    this.ctx.textAlign = align;
    this.ctx.font = size;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
}
