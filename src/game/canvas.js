export class Canvas {
  constructor(node, background) {
    this.node = node;
    this.background = background;
    this.ctx = node.getContext("2d");
    this.ctx.drawImage(background, 0, 0, node.width, node.height);
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
    return this.node.width;
  }
  get height() {
    return this.node.height;
  }

  save() {
    this.ctx.save();
  }
  restore() {
    this.ctx.restore();
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
    this.ctx.clearRect(0, 0, this.node.width, this.node.height);
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.node.width,
      this.node.height
    );
  }
}
