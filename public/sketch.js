let socket = io();

socket.on('connect', function () {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  let changeSizebtn = select('#changeSize');
  changeSizebtn.mousePressed(changeSizefunction);

  let clearCanvasbtn = select('#clearcanvas');
  clearCanvasbtn.mousePressed(clearCanvas);

  // Request drawing data upon connecting
  socket.on('drawingData', function (data) {
    data.forEach(drawPos);
  });

  socket.on('data', function (obj) {
    console.log(obj);
    drawPos(obj);
  });
}

let currentSize;

function mouseDragged() {
  let clientdraw = {
    x: mouseX,
    y: mouseY,
    size: currentSize
  };
  socket.emit('data', clientdraw);
}

function changeSizefunction() {
  currentSize = {
    x: random(50),
    y: random(50)
  };
  socket.emit('changeSize', currentSize);
}

function drawPos(data) {
  noStroke();
  fill(random(100, 255), random(200, 255), random(100, 210));
  ellipse(data.x, data.y, data.size.x, data.size.y);
}

function clearCanvas() {
  background(255);
}