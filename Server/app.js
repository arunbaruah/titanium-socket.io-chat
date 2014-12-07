var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
//
//
http.listen(3000, function(){
  console.log('listening on http://localhost:3000');
});
//
//
var history = []; // simple history
//
//  Handle the user connection to socket server
//
io.on('connection', function(socket){
  console.log( "A new user just connect!" );
  
  socket.on( 'disconnect', function(){
    console.log( "A user disconnect :(" );
  });
  
  // Handle the event sent from user
  socket.on('user message', function(msg){
    var params = {
        userID : socket.id,
        message : msg
    };
    
    // Push the new message to our history array
    history.push( params );
    
    // Emit the same message to original user
    io.emit('update messages', params );
    
    // Emit the message to other users connected on server
    io.broadcast.emit( 'update messages', params );
  });
  
  // Emit the history to the new user
  io.emit( 'chat history', history );
});
