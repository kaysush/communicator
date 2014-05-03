var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io');
var io = socketio.listen(server);
var port = Number(process.env.OPENSHIFT_NODEJS_PORT || 8080);
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.get('/',function(request, response){
	response.send('Hello World');
});


io.sockets.on('connection', function(socket){

	socket.on('message' , function(message){
		console.log(message);
		socket.broadcast.emit('message' , message);
	})

	socket.on('disconnect' , function(){
		console.log('A client left');
	})

});


server.listen(port , ipAddress, 	function(){
	console.log('Server started at %s:%d',ipAddress,port);
});

