const express = require('express');
const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

const io = require('socket.io')(server, {
  cors: {
    origin: 'https://vjluv.github.io',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('New connection: ' + socket.id);

  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }
}

