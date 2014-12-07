var win = Ti.UI.createWindow({
  title: 'Chat',
  backgroundColor: '#ffffff'
});
win.open();
//
// The Magic go here
//
var io = require( "socket.io" );

var socket = io.connect( "http://localhost:3000", {
  'transports' : [ 'websocket' ],
  'reconnect' : true,
  'reconnect delay' : 100,
  'reconnect limit' : 5000,
  'max reconnection attempts' : Infinity
});
//
// Print that you're connected
//
socket.on( 'connect', function(){
  Ti.API.info( "Connected" );
});
//
// Receive the history from server
//
socket.on( 'chat history', function( data ){
  Ti.API.info( "chat history: " + data );
});
//
// Send Message to server
//
socket.emit( 'user message', "Some message here" );
//
// Receive incomming messages
//
socket.on( 'update messages', function( data ){
  Ti.API.info( "New message: " + data );
});
