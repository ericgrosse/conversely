const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('typing', (val) => {
    io.emit('typing', val);
  });

  socket.on('send message', (msg) => {
    if (msg) {
      io.emit('send message', msg);
    }
  });
  
  /*socket.on('disconnect user', (username) => {
    io.emit('send message', `${username} disconnected`);
  });*/

  socket.on('remove message', () => {
    io.emit('remove message');
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
