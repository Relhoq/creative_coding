class Main1 {
  constructor(x, y, position, radius, lineWidth, ctx) {
    this.position = { x: x, y: y };
    //scale de la forme
    this.radius = radius;
    this.lineWidth = lineWidth;
    this.originPositionH = position;
    this.targetPositionH = position;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.positionH = position;
    this.ctx = ctx;
    /*
          vitesse de d'incrémentation de t
        */
    this.speed = 0.01;
    /*
          t est un compteur qui va de 0 à 1
          qui definit la portion du chemin parcouru
        */
    this.t = 0;
  }

  draw() {
    //check si on est arrivé à destination
    if (Math.abs(this.targetPositionH - this.positionH) > 0.01) this.scale();
    else this.positionH = this.targetPositionH; //on force la position finale

    this.ctx.save();
    this.ctx.translate(this.position.x + 320, this.position.y + 100);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(0, this.positionH, this.radius, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    // this.cane(this.radius + 150, y - 80);
    this.ctx.restore();
  }

  /**
   *
   *  remettre le compteur t à zero
   *  réinitialiser la position du point de départ
   *  assigner la nouvelle position de destination
   */
  resetAndGo() {
    this.t = 0;
    this.originPositionH = this.positionH;
    if (this.positionH == 0) {
      this.targetPositionH = 200;
    } else {
      this.targetPositionH = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 100;
  }

  changeAngle(mouseX, mouseY) {
    if (
      mouseX > this.position.x + 320 - this.radius &&
      mouseX < this.position.x + 320 + this.radius
    ) {
      if (
        mouseY > this.position.y + 100 + this.positionH - this.radius &&
        mouseY < this.position.y + 100 + this.positionH + this.radius
      ) {
        this.resetAndGo();
      }
    }
  }
  /**
   * function de calcul de l'animation
   */
  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.backOut(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    // this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    // this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.positionH = Math.abs(
      this.originPositionH +
        (this.targetPositionH - this.originPositionH) * ease
    );
    this.hue = this.originHue + (this.targetHue - this.originHue) * ease;
  }

  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
