var express = require('express'),
	app = express(),
    route = require('./lib/approuter.js').AppRouter,
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

route.initApp(app, express, __dirname);

/* Server * /
app.configure(function ()
{
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});
*/
/* Listen to specific port */
server.listen(8333);

// Setting route
/*
app.get('/', function (req, res)
{
	res.sendfile(__dirname + '/public/index.html');
});
*/
route
app.get('/', route.index);

app.post('/update', function (req, res)
{
    io.sockets.emit('update', {
        "user" : req.body
    });
});

var allClients = [];

io.sockets.on('connection', function (client)
{
	console.log("nouvelle utilisateur conncecté au leaderboard!"); // sortie console sur serveur
	
	allClients.push(client);
	
	client.on('leaderboard', function ()
	{
		client.emit('update', { // send fake JSON ( currently no REST API )
			"users" : [
				{ "username" : "user 1", "points" : "250" },
				{ "username" : "user 2", "points" : "220" },
				{ "username" : "user 3", "points" : "200" },
				{ "username" : "user 4", "points" : "150" },
				{ "username" : "user 5", "points" : "135" },
				{ "username" : "user 6", "points" : "99" },
				{ "username" : "user 7", "points" : "75" },
				{ "username" : "user 8", "points" : "55" },
				{ "username" : "user 9", "points" : "46" },
				{ "username" : "user 10", "points" : "12" }
			]
		});
	});
});

