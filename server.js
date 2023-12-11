var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server, {
  cors: {
    origin: 'https://vjluv.github.io/brush';
    methods: ["GET", "POST"];
    credentials: true,
  },
});
const socket = io.connect('https://vjluv.github.io/brush'); // Substitua com a URL correta

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('New connection: ' + socket.id);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }
}
