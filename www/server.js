/* SERVER UTILITIES */
var express = require('express'),
	app = express(),
    routes = require('./routes'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server, { log: false, origins: '*:*' }),
	User = require('./models/User.js'),
    util = require('./lib/adfabUtils'),

/* APPLICATION VARIABLES */
    allClients = [];

/* Server */
app.configure(function ()
{
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set("view options", {layout: true});
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    /*app.use(function(req, res, next){
        routes.err404(req, res);
    });*/
});

/* Listen to specific port */
server.listen(8333);

/* Define default index router */
//res.sendfile( require('path').normalize(__dirname + '/../public/index.html?roomID=' + req.params.roomID) );
app.get('/', routes.index);

/* Define router for user who request a leaderboard */
app.get('/leaderboard/:roomID', routes.leaderboard);

/* For now POST method is not in the MODEL part of the app logic because it use the socket and not the REST API */
app.post('/update', function (req, res)
{
    var bodyRequest = req.body;
    res.header('Access-Control-Allow-Origin', '*'); // response with allowed access header
    if(!util.NotNull(bodyRequest.apiKey, "")) {
        res.send('0');
        return;
    }
    io.sockets.in(bodyRequest.apiKey).emit('update', { "user" : req.body });
    res.send('1');
});

/* a user connect to our I/O server */
io.sockets.on('connection', function (client)
{
	console.log("nouvelle utilisateur conncecté au leaderboard!"); // sortie console sur serveur
    
    // User request a leaderboard
	client.on('leaderboard', function (data) // data must contain
	{
        if(!util.NotNull(data.room, "")) return;
        
        // push user to the room Array ( and create hes room in the Array if it doesn't exist )
        if(!util.NotNull(allClients[data.room])) allClients[data.room] = [];
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