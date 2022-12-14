class Main {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    //scale de la forme
    this.originRadius = radius;
    this.targetRadius = radius;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.radius = radius;
    this.ctx = ctx;
    /*
          vitesse de d'incrémentation de t
        */
    this.speed = 0.001;
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
    this.ctx.translate(this.position.x - 230, this.position.y - 90);
    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 50, 0, Math.PI * 2, false);
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
    this.originRadius = this.radius;
    if (this.radius == 0) {
      this.targetRadius = 100;
    } else {
      this.targetRadius = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 100;
  }

  /**
   * function de calcul de l'animation
   */
  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.backInOut(this.t);

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

  cane(x, y) {
    this.ctx.save();
    this.ctx.rotate((20 * Math.PI) / 180);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 20;
    this.ctx.beginPath();
    this.ctx.arc(x - 30, y - 20, 50, Math.PI, 2 * Math.PI);
    this.ctx.moveTo(x + 20, y - 20);
    this.ctx.lineTo(x + 20, y + 200);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }
}
