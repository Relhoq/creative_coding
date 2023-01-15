// variable globale

const pixelRatio = window.devicePixelRatio || 1;

let monCanvas;
let mesOutils;

let lerpValue = 0;
let size = 150 * pixelRatio;
let angle = 90;

let memoire = []; //new Array(); autre façon d'initaliser un array

function start() {
  // constante locale

  monCanvas = document.getElementById("exercice_1");
  monCanvas.width = window.innerWidth * pixelRatio;
  monCanvas.height = window.innerHeight * pixelRatio;
  monCanvas.style.width = window.innerWidth * pixelRatio;
  monCanvas.style.height = window.innerHeight * pixelRatio;
  mesOutils = monCanvas.getContext("2d");

  let squareNumber = 6;
  let midArray = (size * squareNumber) / 2;
  let topLeftW = monCanvas.width / 2 - midArray;
  let topLeftH = monCanvas.height / 2 - midArray;
  for (let i = 0; i < squareNumber; i++) {
    for (let j = 0; j < squareNumber; j++) {
      let simpleTile = new Tile(
        topLeftW + size * i,
        topLeftH + size * j,
        angle * i,
        size,
        mesOutils
      );
      memoire.push(simpleTile);
    }
  }

  animate();

  document.addEventListener("click", function (event) {
    for (let i = 0; i < memoire.length; i++) {
      memoire[i].changeAngle(event.clientX, event.clientY);
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
