const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let drawingData = []; // Array to store drawing data

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Emit drawing data to the client upon connection
  socket.emit('drawingData', drawingData);

  socket.on('data', (data) => {
    drawingData.push(data);
    io.emit('data', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});