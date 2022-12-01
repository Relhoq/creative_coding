class Cercle {
  constructor(r) {
    this.x = monCanvas.width / 2;
    this.y = monCanvas.height / 2;
    this.r = r;
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
    mesOutils.arc(0, 0, this.r, this.r, this.angle1, this.angle2);
    mesOutils.stroke();
    mesOutils.closePath();
  }

  updateSize() {
    this.angle += 0.05;
  }
}
