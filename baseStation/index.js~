/////////////////////////
/// SETUP PARAMETERS ///
////////////////////////

//client username
var user="user";
//client password
var pass="pass";

//client & mailserver admin username
var adminUser="user";
//client & mailserver admin password
var adminPass="pass";

//Walconiator port
var port=1600;
//mailServer port
var mailPort=1601;


//WALCONIATOR CLIENT SERVER
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


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