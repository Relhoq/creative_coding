class Circle {
  constructor(x, y, radius, ctx, factor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.factor = factor;
    this.color = "rgb(255,255,255)";
    this.color_decomposed = {};
    this.color2 = "rgb(255,255,255)";
    // this.luminance = this.getluminence(this.color_decomposed);
    this.angle = 0;
  }

  // move() {
  //   this.xInMotion = this.x * Math.cos((this.angle * Math.PI) / 180) * 10;
  //   this.angle++;
  // }

  draw() {
    const luminance = this.getluminence(this.color_decomposed);

    /*
    const rnd = Math.floor(Math.random() * this.letter.length);
    const letter = this.letter[rnd];

    */
    this.ctx.fillStyle = this.color2;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    // this.ctx.arc(0, 0, this.radius * luminance, 0, 2 * Math.PI);
    //this.ctx.font = `${this.radius * 3 * luminance}px Arial`;
    /*this.ctx.fillText(this.letter, 0, 0);
    this.ctx.textAlign = "center";*/
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
    if (luminance > 0.1) {
      this.y -= luminance * 10;
    }
  }

  getluminence(color) {
    const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
    return luminance / 255;
  }
}
