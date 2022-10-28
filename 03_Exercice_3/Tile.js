class Tile {
  constructor(x, y, angle, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.angle = angle;
    this.r = 200;
    this.originSquareX = -this.r / 2;
    this.originSquareY = -this.r / 2;
  }

  changeAngle(angle, mouseX, mouseY) {
    if (mouseX > this.x && mouseX < this.x + this.r) {
      if (mouseY > this.y && mouseY < this.y + this.r) {
        this.angle = this.angle += 90;
      }
    }
  }

  dessine() {
    // let originSquareX = -this.r / 2;
    // let originSquareY = -this.r / 2;

    mesOutils.save();
    mesOutils.translate(this.x, this.y);
    mesOutils.rotate(this.angle * (Math.PI / 180));

    mesOutils.lineWidth = 2;
    mesOutils.beginPath();
    mesOutils.strokeStyle = "black";
    mesOutils.rect(this.originSquareX, this.originSquareY, this.r, this.r);
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.fillStyle = "grey";

    mesOutils.lineWidth = 2;
    mesOutils.beginPath();
    mesOutils.fillRect(this.originSquareX, this.originSquareY, this.r, this.r);
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.fillStyle = "black";

    mesOutils.lineWidth = 2;
    mesOutils.beginPath();
    mesOutils.fillRect(
      this.originSquareX + this.r / 2,
      this.originSquareY + this.r / 2,
      this.r / 2,
      this.r / 2
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.lineWidth = 2;
    mesOutils.beginPath();
    mesOutils.fillRect(
      this.originSquareX,
      this.originSquareY,
      this.r / 2,
      this.r / 2
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.lineWidth = 4;
    mesOutils.strokeStyle = "black";
    mesOutils.beginPath();
    mesOutils.arc(
      this.originSquareX + this.r,
      this.originSquareY,
      this.r / 2,
      Math.PI,
      Math.PI / 2,
      true
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.strokeStyle = "black";
    mesOutils.beginPath();
    mesOutils.arc(
      this.originSquareX,
      this.originSquareY + this.r,
      this.r / 2,
      Math.PI * 2,
      (3 * Math.PI) / 2,
      true
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.strokeStyle = "white";
    mesOutils.beginPath();
    mesOutils.arc(
      this.originSquareX,
      this.originSquareY,
      this.r / 2,
      0,
      Math.PI / 2,
      false
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.beginPath();
    mesOutils.arc(
      this.originSquareX + this.r,
      this.originSquareY + this.r,
      this.r / 2,
      Math.PI,
      (3 * Math.PI) / 2,
      false
    );
    mesOutils.stroke();
    mesOutils.closePath();

    mesOutils.restore();
  }
}
