var util = require('../lib/adfabUtils'),
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Exports
module.exports.getUsers = getUsers;

/**
 * 
 * @param {String} roomName, API KEY == APP KEY, refer to a client who have user who have points....
 * @param {Number} startIndex, -1 pour recupérer les 10 dernier
 * @param {Number} numberOfUser, default 10, numbers of user to return
 * @param {Function} cb, callback function must be the last argument
 */
function getUsers (roomName, startIndex, numberOfUser, cb)
{
    if(!util.NotNull(roomName)) return;
    // define variable
    var _a, err, index, nb;
    
    // Retrieve last arg from the function call
    _a = arguments[(arguments.length-1)];
    
    // IF callBack is passed as thrid arg
    if( (!util.NotNull(cb) || typeof(cb) != 'function') ) {
        // IF callBack is passed as last arg
        if( arguments.length > 0 && _a != null && _a != undefined && typeof(_a) == 'function' ) cb = _a;
        // IF no callBack
        else return;
    }
    
    err = false; // WILL HANDLE ERROR LATER
    index = startIndex || -1;
    nb = numberOfUser || 10;
    
    
    // ------------------------------------------
    //TODO retrieve from BDD users from request -
    // ------------------------------------------
    var xhr = new XMLHttpRequest(); // Voyez la fonction getXMLHttpRequest() définie dans la partie précédente
    
	xhr.onreadystatechange = function ()
	{
		console.log(xhr.readyState);
		console.log(xhr.status);
		console.log(xhr.responseText);
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			console.log(xhr.responseText); // C'est bon \o/
		}
	};
	console.log("http://localhost/github/leaderboard/db/db.php?leaderboard=1&API_KEY=" + roomName);
	xhr.open("GET", "http://localhost/github/leaderboard/db/db.php?leaderboard=1&API_KEY=" + roomName, true);
	xhr.send(null);
    
    if (err) cb(err); // IF error happened
    else { // send JSON request
    	//b(null, );
        /*cb(null, { // send fake JSON ( currently no REST API )
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
            ],
            room : roomName // Don't forget to re-send room's name
        });*/
    }
}