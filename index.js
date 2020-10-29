const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message', 'a user connected');
  
  socket.on('typing', (val) => {
    if (val) {
      io.emit('chat message', 'a user is typing...');
    }
  });

  socket.on('chat message', (msg) => {
    if (msg) {
      io.emit('chat message', msg);
    }
  });
  
  socket.on('disconnect', () => {
    io.emit('chat message', 'a user disconnected');
  });

  socket.on('remove message', () => {
    io.emit('remove message');
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
