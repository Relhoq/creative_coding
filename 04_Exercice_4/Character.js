class Character {
  constructor(ctx, xO, yO) {
    this.ctx = ctx;
    this.yO = yO;
    this.xO = xO;
  }

  draw(x, y, size, sizeY, sizeX) {
    this.ctx.save();
    this.ctx.lineWidth = 10;
    this.ctx.fillStyle = "white";
    this.ctx.translate(this.xO, this.yO);

    //mouth
    this.ctx.strokeStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(x, y - sizeY / 8, sizeX / 5, Math.PI, 2 * Math.PI, true);
    this.ctx.stroke();
    this.ctx.closePath();
    this.eyes(x, y, sizeY, sizeX);

    // this.shape(x, y, sizeX);
    this.ctx.restore();
  }

  eyes(x, y, size, sizeX) {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(x - size / 4, y - size / 4, sizeX / 10, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(x + size / 4, y - size / 4, sizeX / 10, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
}
