var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  io.on('connection', (socket) => {
      let name='';
    socket.broadcast.emit('chat message','A new user entered!')
    socket.on('set nickname', (msg) => {
        name=msg;
      });
      socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', "Message by "+name+": "+msg);
      });
    socket.on('disconnect', () => {
      socket.broadcast.emit('chat message',name+' leaved!')
    });
  });
http.listen(3000, () => {
  console.log('listening on *:3000');
});