class Cercle {
  constructor(r1, r2) {
    this.x = monCanvas.width / 2;
    this.y = monCanvas.height / 2;
    this.r1 = r1;
    this.r2 = r2;
    this.angle = Math.PI;
    this.angle1 = 0;
    this.angle2 = 2 * Math.PI;
    this.size = (1.3 + Math.cos(this.angle)) * 7;
    this.updateSize();
    this.lineWidth = mesOutils.lineWidth;
  }

  draw() {
    mesOutils.beginPath();
    mesOutils.strokeStyle = "white";

    this.lineWidth = 10;
    mesOutils.arc(this.x, this.y, this.r1, this.r2, this.angle1, this.angle2);
    mesOutils.stroke();
    mesOutils.closePath();
    mesOutils.restore();
  }

  updateSize() {
    this.angle += 0.05;
  }
}
