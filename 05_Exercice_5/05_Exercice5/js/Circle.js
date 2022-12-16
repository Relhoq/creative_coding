class Circle {
  constructor(
    x,
    y,
    radius,
    mouseX,
    mouseY,
    mouseRadius,
    canvasH,
    canvasW,
    ctx
  ) {
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;
    this.origin = { x: x, y: y };
    this.mouse = { x: mouseX, y: mouseY, radius: mouseRadius };
    this.radius = radius;
    this.canvasH = canvasH;
    this.canvasW = canvasW;
    this.density = Math.random() * 30 + 1;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.replacement_color = "rgb(255,255,255)";
    this.luminosity_percentage = this.detectLuminance();
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.rect(
      0,
      0,
      this.radius * this.luminosity_percentage,
      this.radius * this.luminosity_percentage
    );
    // this.ctx.arc(
    //   0,
    //   0,
    //   this.radius * this.luminosity_percentage,
    //   0,
    //   2 * Math.PI
    // );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }

  updateMousePosition(mousex, mousey) {
    if (mousex) {
      this.mouse.x = mousex;
      this.mouse.y = mousey;
    }
  }

  update() {
    let dx = this.mouse.x - this.x;
    let dy = this.mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    /*
      this.mouse.distance n'existe pas....
    */
    let maxDistance = this.mouse.radius; //this.mouse.distance;
    let force = ((maxDistance - distance) / maxDistance) * 2;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < this.mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
      this.radius = 10;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
        this.radius = 30;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;

        this.radius = 30;
      }
    }
  }
}
