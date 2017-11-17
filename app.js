var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyparser = require('body-parser');
var user = [];

app.get('/', function(req, res){
  	res.sendFile(__dirname + '/index.html');
});

app.get('/duong', function(req, res){
  	res.sendFile(__dirname + '/index1.html');
});

io.on('connection', function(socket){
  	console.log('a user connected');
  	socket.on('makegame', (name) => {
  		if(user.length == 0){
  			user.push(name);
  			console.log(name + ' is on queue');
  		} else {
        var index = Math.floor((Math.random() * (user.length - 1)));
        
  			io.emit(name, user[index]);
  			io.emit(user[index], name);
        user.splice(index, 1);
  		}
  	});

    socket.on('makemove', (data) => {
      io.emit('move'+data.name, data.move);
    });

    socket.on('disconnect', (data) => {
      console.log('a user is disconnect ' + data);
    });

});



http.listen(8080, function(){
  	console.log('listening on *:8080');
});