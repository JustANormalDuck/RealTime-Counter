const http = require('http');
const express = require('express');
const socketio = require('socket.io');

var clickCount = 0;

const app=express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname +'/FrontEnd'));

io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the server receives clicked message, do this
    client.on('clicked', function(data) {
          clickCount++;
          if(clickCount==5)
                clickCount=0;
          //send a message to ALL connected clients
        
          io.emit('buttonUpdate', clickCount);
        
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

