// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;
let rotationP = Math.PI;
let rotationN = 0;

//turquoise
let color1 = {
  r: 3,
  g: 103,
  b: 93,
};

//rouge
let color2 = {
  r: 172,
  g: 18,
  b: 26,
};

//gris
let color3 = {
  r: 40,
  g: 39,
  b: 34,
};

let lerpValue = 0;

function start() {
  // constante locale
  monCanvas = document.getElementById("exercice_1");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  animate();
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function lerpCol(colorStart, colorStop, amount) {
  let r = map(amount, 0, 1, colorStart.r, colorStop.r);
  let g = map(amount, 0, 1, colorStart.g, colorStop.g);
  let b = map(amount, 0, 1, colorStart.b, colorStop.b);

  return { r, g, b };
}

function animate() {
  requestAnimationFrame(animate);
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);

  lerpValue = Math.sin(performance.now() * 0.0001);
  lerpValue = (lerpValue + 1) / 2; // 0 a 1

  console.log();

  rotationP += 0.001;
  rotationN -= 0.001;

  dessine();
  // shape(0, 0, 0);
}

function dessine() {
  const centerX = (monCanvas.width / 2) * pixelRatio,
    centerY = (monCanvas.height / 2) * pixelRatio;

  let lerpedColor1 = lerpCol(color1, color2, lerpValue);
  let lerpedColor2 = lerpCol(color2, color3, lerpValue);
  let lerpedColor3 = lerpCol(color3, color1, lerpValue);

  let couleur3 = rgb(lerpedColor2.r, lerpedColor2.g, lerpedColor2.b);
  let couleur2 = rgb(lerpedColor1.r, lerpedColor1.g, lerpedColor1.b);
  let couleur1 = rgb(lerpedColor3.r, lerpedColor3.g, lerpedColor3.b);

  mesOutils.save();

  mesOutils.translate(centerX, centerY);

  mesOutils.fillStyle = "black";
  mesOutils.beginPath();
  mesOutils.rect(-320, -320, 640, 640);
  mesOutils.closePath();
  mesOutils.fill();

  mesOutils.fillStyle = "#cececc";
  mesOutils.beginPath();
  mesOutils.rect(-300, -300, 600, 600);
  mesOutils.closePath();
  mesOutils.fill();

  mesOutils.save();
  mesOutils.rotate(rotationN);
  shape(300, 260, 150, couleur1, couleur2, couleur3);
  mesOutils.restore();

  mesOutils.save();
  mesOutils.rotate(rotationP);
  shape(230, 198, 114, couleur1, couleur2, couleur3);
  mesOutils.restore();

  mesOutils.save();
  mesOutils.rotate(rotationN);
  shape(162.5, 140, 81.5, couleur1, couleur2, couleur3);
  mesOutils.restore();

  mesOutils.save();
  mesOutils.rotate(rotationP);
  shape(95, 83, 48, couleur1, couleur2, couleur3);
  mesOutils.restore();

  mesOutils.save();
  mesOutils.rotate(rotationN);
  shape(27, 24, 13.5, couleur1, couleur2, couleur3);
  mesOutils.restore();

  mesOutils.restore();
}

function shape(size, big, small, couleur1, couleur2, couleur3) {
  diamond(size, big, small, couleur1);

  mesOutils.save();
  mesOutils.rotate(Math.PI / 1.5);
  diamond(size, big, small, couleur2);
  mesOutils.restore();

  mesOutils.save();
  mesOutils.rotate(Math.PI * (4 / 3));
  diamond(size, big, small, couleur3);
  mesOutils.restore();
}

function diamond(size, big, small, couleur) {
  mesOutils.fillStyle = couleur;
  mesOutils.beginPath();

  mesOutils.moveTo(0 * pixelRatio, 0 * pixelRatio);
  mesOutils.lineTo(0 * pixelRatio, 0 + size * pixelRatio);
  mesOutils.lineTo(0 - big * pixelRatio, 0 + small * pixelRatio);
  mesOutils.lineTo(0 - big * pixelRatio, 0 - small * pixelRatio);
  mesOutils.closePath();
  mesOutils.fill();
}

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

window.onload = () => {
  start();
};
