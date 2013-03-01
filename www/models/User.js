var CONF = require('../config/config'),
    util = require('../lib/adfabUtils'),
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Exports
module.exports = {
    
    /**
     * 
     * @param {String} [roomName / client API_KEY], API KEY == APP KEY, refer to a client who have user who have points....
     * @param {Number} startIndex, -1 pour recupérer les 10 dernier
     * @param {Number} numberOfUser, default 10, numbers of user to return
     * @param {Function} cb, callback function must be the last argument
     * @return {Object}
     */
    getUsers : function (roomName, startIndex, numberOfUser, cb)
    {
        if(!util.NotNull(roomName)) return;
        var _a, index, nb, response; // define variable
        
        _a = arguments[(arguments.length - 1)]; // Retrieve last arg from the function call
        
        // IF callBack is passed as thrid arg
        if( (!util.NotNull(cb) || typeof(cb) != 'function') ) {
            if( arguments.length > 0 && _a != null && _a != undefined && typeof(_a) == 'function' ) // IF callBack is passed as last arg
                cb = _a;
            else return; // IF no callBack
        }
        
        response = {};
        response.err = null; // WILL HANDLE ERROR / RESPONSE LATER
        index = startIndex || -1;
        nb = numberOfUser || 10;
        
        // Do Ajax request
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) { // SUCCESS
                response = JSON.parse(xhr.responseText);
                cb(response);
            }
            else if(xhr.readyState != 4 && xhr.status != 200 && xhr.status != null) { // EPIC FAIL
                response.err = xhr.readyState;
                cb(response);
            }
        };
        
        xhr.open("GET", CONF.DB.PATH + "?leaderboard=1&API_KEY=" + roomName, true);
        xhr.send(null);
    },
    
    /**
     * Update points for user in DB and notify user who whatch the leaderboard
     * @param {Object} id
     * @param {Object} points
     * @param {Object} cb
     */
    updtUsersPoints : function (id, points, cb)
    {
        if(!util.NotNull(id)) return;
        var points = points || 0; // define variable
        
        _a = arguments[(arguments.length - 1)]; // Retrieve last arg from the function call
        
        // IF callBack is passed as thrid arg
        if( (!util.NotNull(cb) || typeof(cb) != 'function') ) {
            if( arguments.length > 0 && _a != null && _a != undefined && typeof(_a) == 'function' ) // IF callBack is passed as last arg
                cb = _a;
            else return; // IF no callBack
        }
        
        err = false; // WILL HANDLE ERROR LATER
        
        // Do Ajax request
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) cb(null, xhr.responseText);
            else if(xhr.readyState != 4 && xhr.status != 200 && xhr.status != null) cb(err, xhr.responseText);
        };
        xhr.open("GET", CONF.DB.PATH + "?iduser=" + id + "&points=" + points, true);
        xhr.send(null);
    }
};

