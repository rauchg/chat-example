/*jslint node: true */

var app = require('express')();
var express = require('express');
var debug = require('debug')('http');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

io.on('connection', function(socket){

  debug('a user connected');
  io.emit('join', 'new user has joined the chat');

  socket.on('disconnect', function(){
    debug('user disconnected');
    io.emit('left','user has left the chat');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    debug('message received: ' + msg);
  });
});

http.listen(3000, function(){
  debug('listening on *:3000');
});
