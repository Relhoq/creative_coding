const pixelRatio = window.devicePixelRatio;

let mesOutils;
let monCanvas;
let angle = Math.PI;

let size = 20;
let x = 0;
let y = 0;
let circles = [];
let cirlcesV = [];
let cercles;
let cercles2;

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

function animate() {
  requestAnimationFrame(animate);
  mesOutils.clearRect(0, 0, monCanvas.width, monCanvas.height);

  dessine();
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function dessine() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      circle(300 * i, 300 * j);
    }
  }
}

function circle(x, y) {
  mesOutils.save();
  mesOutils.translate(190, 140);

  let size = Math.cos(angle) * 7;
  let circle = 10;

  for (let j = 0; j < circle; j++) {
    circles[j] = map(j, 0, circle, 0, 30);
  }

  for (let i = 0; i < circles.length; i++) {
    mesOutils.beginPath();
    mesOutils.strokeStyle = "white";
    mesOutils.lineWidth = size + i;
    mesOutils.arc(x, y, 15 * i, 15 * i, 0, 2 * Math.PI);

    mesOutils.stroke();
    mesOutils.closePath();
  }

  mesOutils.restore();
  angle += 0.001;
}

window.onload = () => {
  start();
};
