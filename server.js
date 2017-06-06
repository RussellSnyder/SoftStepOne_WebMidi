// Taken from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
var udp = require('dgram');
var server = udp.createSocket('udp4');

server.on('message',function(msg,info){
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
    console.log('Socket is closed !');
});

server.bind(2222);

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var buffer = require('buffer');
var data = Buffer.from('Hello Mother Fuckas!');

client.send(data,2222,'localhost',function(error){
    if(error){
        client.close();
    }else{
        console.log('Data sent !!!');
    }
})

// emits when any error occurs
server.on('error',function(error){
    console.log('Error: ' + error);
    // server.close();
});

setTimeout(function(){
    server.close();
},8000);