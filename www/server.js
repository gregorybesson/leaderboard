var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

/* Server */
app.configure(function ()
{
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/* Listen to specific port */
server.listen(8333);

// Setting route
app.get('/', function (req, res)
{
	res.sendfile(__dirname + '/public/index.html');
});


var allClients = 0; 
var clientId = 1; 

io.sockets.on('connection', function (client) { 
	console.log("nouvelle utilisateur conncecté au leaderboard!"); // sortie console sur serveur
	
	/*
	var my_timer; 
	var my_client = { 
		"id": clientId, 
		"obj": client 
	}; 
	clientId += 1; 
	allClients += 1; 
	my_timer = setInterval(function () { 
		my_client.obj.send(JSON.stringify({ 
			"timestamp": (new Date()).getTime(), 
			"clients": allClients 
		})); 
	}, 1000); 
	client.on('message', function(data) {
		my_client.obj.broadcast.send(JSON.stringify({ 
			message: "poke send by client "+my_client.id 
		})); 
		console.log(data); 
	}); 
	client.on('disconnect', function() { 
		clearTimeout(my_timer); 
		allClients -= 1; 
		console.log('disconnect'); 
	}); 
	*/
});

