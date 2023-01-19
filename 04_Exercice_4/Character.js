class Character {
  constructor(x, y, radius, size, lineWidth, ctx) {
    this.position = { x: x, y: y };
    //scale de la forme
    this.lineWidth = lineWidth;
    this.size = size;

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

  draw() {
    //check si on est arrivé à destination
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale

    this.ctx.fillStyle = `hsl(${this.hue},20%,30%)`;
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate((this.radius * Math.PI) / 180);
    this.ctx.beginPath();
    this.ctx.arc(0 + 50, 0, this.size, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(0, 0 - sizeY / 8, sizeX / 5, Math.PI, 2 * Math.PI, true);
    this.ctx.stroke();
    this.ctx.closePath();
    this.eyes(0, 0, sizeY, sizeX);

    this.ctx.beginPath();
    this.ctx.arc(0, 0 - sizeY / 8, sizeX / 5, Math.PI, 2 * Math.PI, true);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(0 + 80, 0 - sizeY / 8 - 30, 50, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(0 + 160, 0 - sizeY / 8 + 20, 90, Math.PI, 2 * Math.PI, true);
    this.ctx.stroke();
    this.ctx.closePath();
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
      this.targetRadius = 2880 * 2;
    } else {
      this.targetRadius = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 50;
  }

  changeAngle(mouseX, mouseY) {
    if (mouseX > this.position.x - 150 && mouseX < this.position.x + 250) {
      if (
        mouseY > this.position.y + 100 - this.size &&
        mouseY < this.position.y + 100 + this.size
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
    const ease = Easing.elasticOut(this.t);

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
