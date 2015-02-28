/////////////////////////
/// SETUP PARAMETERS ///
////////////////////////

//port
var port=1600;

//MONITOR BASE TO CLIENT SERVER
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//sends webpages
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);
console.log('party');
//adds valid clients to group for mail posting updates
io.on('connection', function(socket){
  console.log("connected");
  socket.emit('connected',true);
  socket.on('login',function(msg){
      if(msg.user==='base'){
        socket.join('bases');
        socket.emit('login',true);
      }
      else if(msg.user=='client'){
        socket.emit('login',true);
        console.log('we got a pall');
      }
      else{
        socket.emit('login',false);
      }
  });
});
http.listen(port, function(){
  console.log('listening on *:'+port.toString());
});
