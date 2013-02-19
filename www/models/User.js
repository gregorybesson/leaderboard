// Exports
module.exports.getUsers = getUsers;

/**
 * 
 * @param {Object} roomName, API KEY == APP KEY, refer to a client who have user who have points....
 * @param {Object} startIndex, -1 pour recupérer les 10 dernier
 * @param {Object} numberOfUser, default 10, numbers of user to return
 * @param {Object} cb, callback function must be the last argument
 */
function getUsers (roomName, startIndex, numberOfUser, cb)
{
    if(roomName == null || roomName == undefined || roomName == "") return;
    // define variable
    var _a, err, index, nb;
    
    // Retrieve last arg from the function call
    _a = arguments[(arguments.length-1)];
    
    // IF callBack is passed as thrid arg
    if( (cb == null || cb || undefined || typeof(cb) != 'function') ) {
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
    
    
    if (err) cb(err); // IF error happened
    else { // send JSON request
        cb(null, { // send fake JSON ( currently no REST API )
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
        });
    }
}
