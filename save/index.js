let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ctxW = canvas.width;
let ctxH = canvas.height;

let elPX = document.getElementById("playerX");
let elPY = document.getElementById("playerY");

let img = new Image();
img.src = "car.png";

let track = new Image();
track.src = "road.png";

let TO_RADIANS = Math.PI / 180;

let carX = 870;
let carY = 370;
let acceleration = 1.1;
let rotationStep = 4;
let rotation = 350;
let speed = 0;
let speedDecay = 0.98;
let maxSpeed = 4;
let backSpeed = 4;

const drawRotatedImage = (image, x, y, angle) => {
  // save the current co-ordinate system
  ctx.save();
  // translate
  ctx.translate(x, y);

  // rotate around the point
  // converting angle for degrees to radians
  ctx.rotate(angle * TO_RADIANS);

  // draw image with our specified coords.addEventListener('
  ctx.drawImage(image, -(image.width / 2), -(image.height / 2));

  // and then restore the coords, to how they were when we began our journey together down this road.
  ctx.restore();
};

const draw = () => {
  // canvas works like this
  // clear first
  // then re-draw it

  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(track, 0, 0);
  drawRotatedImage(img, carX, carY, rotation);
};

// window.addEventListener('keydown', (e)=>{
//   console.log(e.keyCode);
// });

let key = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

let keys = {
  38: false,
  40: false,
  37: false,
  39: false
};

const speedXY = (rotation, speed) => {
  return {
    x: Math.sin(rotation * TO_RADIANS) * speed,
    x: Math.cos(rotation * TO_RADIANS) * speed * -1
  };
};

const step = () => {
  // key movements
  if (keys[key.UP]) {
    speed += 0.2;
  }
  if (keys[key.DOWN]) {
    speed -= 0.2;
  }
  if (keys[key.LEFT]) {
    console.log("go left");
  }
  if (keys[key.RIGHT]) {
    console.log("go right");
  }

  let speedAxis = speedXY(rotation, speed);
  carX += speedAxis.x;
  carY += speedAxis.y;

  // update player coords with innerhtml for elPX & el PY
  elPX.innerHTML = Math.floor(carX);
  elPY.innerHTML = Math.floor(carY);
};

window.addEventListener("keydown", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = true;
  }
});
window.addEventListener("keyup", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = false;
  }
});

const frame = () => {
  step();
  draw();
  window.requestAnimationFrame(frame);
};

frame();
