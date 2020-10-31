const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('sending message to client...');
  io.emit('message');

  socket.on('message', () => {
    console.log('message received from client');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
