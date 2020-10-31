const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  io.emit('send message', 'a user connected');
  
  socket.on('typing', (val) => {
    if (val) {
      io.emit('send message', 'a user is typing...');
    }
  });

  socket.on('send message', (msg) => {
    if (msg) {
      io.emit('send message', msg);
    }
  });
  
  socket.on('disconnect', () => {
    io.emit('send message', 'a user disconnected');
  });

  socket.on('remove message', () => {
    io.emit('remove message');
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
