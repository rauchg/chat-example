var app = require('express')();
var debug = require('debug')('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  debug('a user connected');
  io.emit('new user has joined the chat');

  socket.on('disconnect', function(){
    debug('user disconnected');
    io.emit('user has left the chat');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    debug('message received: ' + msg);
  });
});

http.listen(3000, function(){
  debug('listening on *:3000');
});
