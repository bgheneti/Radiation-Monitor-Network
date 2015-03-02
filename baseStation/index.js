/////////////////////////
/// SETUP PARAMETERS ///
////////////////////////
//port
var port=1600;
var connected=false;

//BASE STATION SERVER
var express = require('express');
var app = express();
var util = require('util');
var http = require('http').Server(app);
var serving = require('socket.io-client');
var io = require('socket.io-client');
var socket = io.connect('http://dahlia.mit.edu:1600', {reconnect: true});
var path = require('path');
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600
}, false); // this is the openImmediately flag [default is true]


socket.on('connect', function(socket) { 
    console.log('Connected!');
    connected=true;
});

socket.on('disconnect', function(){
    console.log('Disconnected!');
    connected=false;
});

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      var temp=data[0];
      socket.emit("nodeData",{node:1,temperature:temp});  
      console.log('temp received: ' + temp);
    });
    serialPort.write("ls\n", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }
});



/*
var XBee = require('svd-xbee').XBee;
var xbee = new XBee({
	port: '/dev/ttyUSB0', 
	baudrate: 9600,
	nodeDiscoveryTime: 6000
}).init();

xbee.on("initialized", function(params){
    console.log("XBee Params: %s", util.inspect(params));
});

console.log("MOO");

xbee.discover();

console.log("discovering");

xbee.on("discoveryEnd", function(){
    console.log("discovery ended");
});

var cube = xbee.addNode([0x00,0x13,0xa2,0x00,0x40,0xc5,0x56,0x94]);

cube.on("data", function(data) {
    console.log("message:",data);
});


//adds valid clients to group for mail posting updates
io.on('connection', function(socket){
  socket.emit('connected',true);
  socket.on('login',function(msg){
      if(msg.user===user && msg.pass=pass){
        socket.join('walconia');
        socket.emit('login',true);
      }
      else if(msg.user===adminUser && msg.pass=adminPass){
        socket.join('walconiator');
        socket.emit('login',true);
      }
      else{
        socket.emit('login',false);
      }
  });
});
http.listen(port, function(){
  console.log('listening on *:'+port.toString());
});

//processor for data from Xbee
var parse=require('./parseXbee')(io);

*/
