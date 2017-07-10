var express  =  require( "express");
var path  =  require( "path");
var session = require('express-session');
var app  =  express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); 
var count = 0
app.use(session({secret: 'codingdojorocks'}));
// static content 
app. use(express.static(path. join(__dirname  +  "./static")));

// setting up ejs and our views folder
app.set( 'views', path. join(__dirname,  './views'));
app.set( 'view engine',  'ejs');

// root route to render the index.ejs view
app.get( '/', function(req, res) {

 res. render( "index");
})



// tell the express app to listen on port 8000
var server  = app. listen(8000, function() {
 console. log( "listening on port 8000");
});

var io  =  require( 'socket.io'). listen(server);


io.sockets. on( 'connection', function (socket) {
  console. log( "USER CONNECTED!");
  console. log(socket.id);
  socket.on('disconnect', function(){
    console.log('USER DISCONNECTED :(');
  });
  socket.on('got_a_new_user', function(req){
    console.log(req.name)
    var users = []
    users.push(req.name)
    io.sockets.emit('new_user', {name: req.name})
    
    io.sockets.emit('existing_users', users)
  });
  var users = {};
  users

  socket.on('chat message', function(msg){
    console.log('message: ' + msg.name + msg.message);
    
    io.emit('chat message', msg);
    });
  });

