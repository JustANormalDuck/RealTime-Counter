const http = require('http');
const express = require('express');
const socketio = require('socket.io');

var clickCount1 = 0;
var clickCount2 = 0;

const app=express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname +'/FrontEnd'));

io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the server receives clicked message, do this
    client.on('clicked1', function(data) {
          clickCount1++;
          if(clickCount1==5)
                clickCount1=0;
          //send a message to ALL connected clients
        
          io.emit('buttonUpdate1', clickCount1);   
    });
    client.on('clicked2', function(data) {
      clickCount2++;
      if(clickCount2==5)
            clickCount2=0;
      //send a message to ALL connected clients
    
      io.emit('buttonUpdate2', clickCount2);
    
});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

