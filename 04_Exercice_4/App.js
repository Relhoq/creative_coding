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

    this.main1 = new Character(
      this.canvas.width / 2,
      this.canvas.height / 2,
      200,
      this.ctx
    );

    this.cane = new Cane(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.ctx
    );

    this.circle = new Circle(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.ctx
    );

    this.test = new Test(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.ctx
    );

    this.main = new Main(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this.ctx
    );
    this.setup();
  }

  setup() {
    y = -400;
    ySpeed = 4;

    sizeX = 200;
    sizeY = 200;

    document.addEventListener("click", this.click.bind(this));
    this.draw();
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    this.circle.draw(0, 0);

    this.test.draw(450);

    this.cane.draw(0, 0);

    this.main.draw(0, 0);

    this.main1.draw(0, 0);

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
    /*
    this.rect.resetAndGo(
      e.clientX * this.pixelRatio,
      e.clientY * this.pixelRatio
    );
*/

    this.circle.changeAngle(e.clientX, e.clientY);

    this.test.changeAngle(e.clientX, e.clientY);

    //this.test.resetAndGo();

    this.main1.changeAngle(e.clientX, e.clientY);

    this.cane.changeAngle(e.clientX, e.clientY);
  }
}

window.onload = function () {
  new App();
};
