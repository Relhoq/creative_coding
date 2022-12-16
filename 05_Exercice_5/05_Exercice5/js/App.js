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
    this.img_file = "./asset/andy.jpg";
    this.mouseX = null;
    this.mouseY = null;
    window.addEventListener(`mousemove`, (event) => {
      this.mouseX = event.clientX * this.pixelRatio;
      this.mouseY = event.clientY * this.pixelRatio;

      // console.log(this.mouseY, this.mouseX);
    });

    document.addEventListener("click", (e) => {
      this.maVideo.play();
    });

    this.mouseRadius = 200;
    this.setup();
  }

  initWebcam() {
    //init webcam
    this.maVideo = document.getElementById("video");
    // this.maVideo.play();
    this.maVideo.loop = true;
    this.maVideo.muted = true;

    // document.body.appendChild(this.video);
  }

  setup() {
    this.initWebcam();

    // init webcam

    // create grid
    this.grid = [];
    this.scale = 2;
    //quel espace entre chaque cercle si on en veut 50 sur la largeur et la hauteur
    this.stepX = Math.floor(640 / 50);
    this.stepY = Math.floor(480 / 50);
    // coordonnee de décalage de la grille
    this.offsetX =
      (window.innerWidth / 2) * this.pixelRatio -
      (this.stepX * 50 * this.scale) / 2;
    this.offsetY =
      (window.innerHeight / 2) * this.pixelRatio -
      (this.stepY * 50 * this.scale) / 2;
    //creation de la grille
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        this.grid.push(
          new Circle(
            this.offsetX + i * this.scale,
            this.offsetY + j * this.scale,
            30,
            this.mouseX,
            this.mouseY,
            this.mouseRadius,
            this.canvas.height,
            this.canvas.width,
            this.ctx
          )
        );
      }
    }

    this.draw();
  }

  detectPixels() {
    // console.log("detectPixels");
    if (this.maVideo) {
      this.ctx.drawImage(this.maVideo, 0, 0, 640, 480);
    }
    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, 640, 480);
    // get pixel data
    this.pixels = this.imgData.data;

    // get rgb data for each step pixel in 100 x 100
    this.rgb = [];
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        let index = (j * 640 + i) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }

    // this.draw();
  }

  draw() {
    this.detectPixels();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw all circle of the grid
    this.grid.forEach((circle, index) => {
      const color = this.rgb[index];
      circle.color = `rgba(${color.r}, ${color.g}, ${color.b},0.8)`;
      /**
       * IL FAUT UPDATER LES COORDONNEES DE LA SOURIS
       */
      circle.updateMousePosition(this.mouseX, this.mouseY);
      circle.draw();
      circle.update();
    });
    requestAnimationFrame(this.draw.bind(this));
  }

  map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

window.onload = function () {
  new App();
};
