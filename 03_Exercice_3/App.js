// constante globale
const pixelRatio = window.devicePixelRatio;
// variable globale
let monCanvas;
let mesOutils;

let lerpValue = 0;
let r = 200;
let angle = 90;

let memoire = []; //new Array(); autre façon d'initaliser un array

function start() {
  // constante locale
  monCanvas = document.getElementById("exercice_1");
  monCanvas.width = (window.innerWidth - 60 * pixelRatio) * pixelRatio;
  monCanvas.height = (window.innerHeight - 60 * pixelRatio) * pixelRatio;
  monCanvas.style.width = window.innerWidth - 60 * pixelRatio;
  monCanvas.style.height = window.innerHeight - 60 * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let simpleTile = new Tile(200 * i, 200 * j, angle * i, mesOutils);
      memoire.push(simpleTile);
    }
  }

  animate();

  document.addEventListener("click", function (event) {
    for (let i = 0; i < memoire.length; i++) {
      memoire[i].changeAngle(
        angle,
        event.clientX + r / 2,
        event.clientY + r / 2
      );
    }
  });
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function animate() {
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);

  /*
  for (let i = 0; i < memoire.length; i++) {
    memoire[i].dessine();
  }
*/

  memoire.forEach(function (tile) {
    tile.dessine();
  });

  requestAnimationFrame(animate);
}

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

window.onload = () => {
  start();
};
