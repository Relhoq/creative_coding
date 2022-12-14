class Cane {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    //scale de la forme
    this.originRadius = radius;
    this.targetRadius = radius;
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.radius = radius;
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

  draw(x, y) {
    //check si on est arrivé à destination
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale

    this.ctx.save();
    this.ctx.translate(this.position.x - 230, this.position.y - 110);
    this.ctx.rotate((this.radius * Math.PI) / 180);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 20;
    this.ctx.beginPath();
    this.ctx.arc(x - 50, y, 50, Math.PI, 2 * Math.PI);
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + 250);
    this.ctx.closePath();
    this.ctx.stroke();
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
    this.originRadius = this.radius;
    if (this.radius == 0) {
      this.targetRadius = 4 * 360;
    } else {
      this.targetRadius = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 50;
  }

  changeAngle(mouseX, mouseY) {
    if (
      mouseX > this.position.x - 230 - 50 &&
      mouseX < this.position.x - 230 + 50
    ) {
      if (
        mouseY > this.position.y - 90 - 50 &&
        mouseY < this.position.y - 90 + 50
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
    const ease = Easing.circIn(this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    // this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    // this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.radius = Math.abs(
      this.originRadius + (this.targetRadius - this.originRadius) * ease
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
