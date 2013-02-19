/* SERVER UTILITIES */
var express = require('express'),
	app = express(),
    routes = require('./routes'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	User = require('./models/User.js'),

/* APPLICATION VARIABLES */
    allClients = [];

/* Server */
app.configure(function ()
{
    app.set('views', __dirname + '/public');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

/* Listen to specific port */
server.listen(8333);

/* Define default index router */
app.get('/', routes.index);

/* Define router for user who request a leaderboard */
app.get('/leaderboard/:roomID', routes.leaderboard);

/* For now POST method is not in the MODEL part of the app logic because it use the socket and not the REST API */
app.post('/update', function (req, res)
{
    var bodyRequest = req.body;
    if(bodyRequest.apiKey == null || bodyRequest.apiKey == undefined || bodyRequest.apiKey == "") return;
    io.sockets.in(bodyRequest.apiKey).emit('update', { "user" : req.body });
});

/* a user connect to our I/O server */
io.sockets.on('connection', function (client)
{
	console.log("nouvelle utilisateur conncecté au leaderboard!"); // sortie console sur serveur
    
    // User request a leaderboard
	client.on('leaderboard', function (data) // data must contain
	{
        if(data.room == null || data.room == undefined || data.room == "") return;
        
        // push user to the room Array ( and create hes room in the Array if it doesn't exist )
        if(allClients[data.room] == null || allClients[data.room] == undefined) allClients[data.room] = [];
        allClients[data.room].push(client);
        
	    client.join(data.room); // Make the client user join the requested room
	    client.currentRoom = data.room; // Save hes room name so he know it
	    
	    // Request user from the leaderboard's room
        User.getUsers(-1, data.room, function(err, userData) {
            if (err) throw err;
            client.emit('update', userData); // send the leaderboard to the user who just connect
        });
	});
	
	// Listen for connection close to remove the user from the room he was
	client.on('disconnect', function () {
        //io.sockets.in(client.currentRoom).emit('test'); // e: to broadcast stuff when a room user has left it
	    allClients[client.currentRoom] = allClients[client.currentRoom].slice( // Delete user from room visited
	        allClients[client.currentRoom].indexOf(client)
	        , 1
	    );
    });
    
});