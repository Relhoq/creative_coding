let y = 0;
let ySpeed;
let sizeX, sizeY;
let characters = [];

let clicknumber = 0;

class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.character = new Character(
      this.ctx,
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.rect = new Rect(100, 100, 200, this.ctx);

    this.circle = new Circle(
      this.canvas.width / 2,
      this.canvas.height / 2,
      200,
      this.ctx
    );

    this.setup();
  }

  setup() {
    y = -400;
    ySpeed = 4;

    sizeX = 200;
    sizeY = 200;

    for (let i = 0; i < 5; i++) {
      let character = new Character(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      characters.push(character);
    }

    console.log(characters);

    document.addEventListener("click", this.click.bind(this));
    this.draw();
  }

  draw(e) {
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    this.circle.draw(0, this.canvas.height / 2, y);

    this.character.draw(0, y, 200, sizeY, sizeX);

    this.rect.draw(0, this.canvas.height / 2);
    /*
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      0,
      this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.restore();
*/
    if (y >= 50) {
      y = 50;
    } else {
      y += ySpeed;
    }

    if (y >= -50) {
      if (sizeX <= 100) {
        sizeX += 0;
        sizeY += 0;
      } else {
        sizeX -= ySpeed;
        sizeY += ySpeed;
      }
    }
    /*
    this.ctx.save();
    this.ctx.strokeStyle = "white";
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height / 2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.ctx.stroke();
    this.ctx.restore();
*/
    // console.log(y);

    requestAnimationFrame(this.draw.bind(this));
  }

  click(e) {
    this.rect.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );

    this.circle.resetAndGo();
  }
}

window.onload = function () {
  new App();
};
