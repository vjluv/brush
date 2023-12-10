var socket;
var currentBrush = 'brushone'; // Pincel padrão
var b = 50;
var x = 100; // Variável usada no brush two

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  noStroke();
  if (data.brush === 'brushone') {
    brushOne(data.x, data.y);
  } else if (data.brush === 'brushtwo') {
    brushTwo(data.x, data.y);
  } else if (data.brush === 'brushthree') {
    brushThree(data.x, data.y);
  }
}

function mouseDragged() {
  console.log('Sending: ' + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY,
    brush: currentBrush // Envie o pincel atual
  };

  socket.emit('mouse', data);

  noStroke();
  if (currentBrush === 'brushone') {
    brushOne(mouseX, mouseY);
  } else if (currentBrush === 'brushtwo') {
    brushTwo(mouseX, mouseY);
  } else if (currentBrush === 'brushthree') {
    brushThree(mouseX, mouseY);
  }
}

function brushOne(x, y) {
  fill(0, 200, 255);
  rect(x - 40, y - 40, b * 1.8, b / 5);
  fill(255, 106, 240);
  ellipse(x - 20, y - 20, b / 2, b / 2);
  fill(255, 255, 10);
  ellipse(x - 10, y - 10, b / 3, b / 3);
  fill(255, 100, 0);
  rect(x + 5, y + 5, b / 2, b / 2);
  fill(40, 255, 190);
  rect(x, y, b / 9, b * 1.5);
  fill(255, 0, 0);
  rect(x - 30, y + 10, b / 9, b);
  fill(255, 0, 255);
  rect(x + 10, y + 10, b + 20, b / 9);
}

function brushTwo(x, y) {
  noStroke();
  fill(0, 255, 255);
  rect(x - 30, y - 30, b / 6, b * 2);
  fill(0, 220, 255);
  rect(x - 20, y - 20, b / 5, b * 2);
  fill(0, 180, 255);
  rect(x, y, b / 5, b * 2);
  fill(0, 100, 255);
  rect(x + 15, y + 15, b / 5, b * 2);
  fill(0, 0, 255);
  rect(x + 30, y + 30, b / 7, b * 2);
}

function brushThree(x, y) {
  fill(0, 0, 255);
  rect(x - 4, y - 4, b * 1.8, b / 5);
  fill(255, 106, 240);
  ellipse(x, y, b / 2, b / 2);
}

function keyPressed() {
  // Alterne entre os pincéis ao pressionar as teclas 1, 2 e 3
  if (key === '1') {
    currentBrush = 'brushone';
  } else if (key === '2') {
    currentBrush = 'brushtwo';
  } else if (key === '3') {
    currentBrush = 'brushthree';
  }
}

function draw() {
  // Adicione qualquer lógica de desenho adicional aqui, se necessário
}
