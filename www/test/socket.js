var CONF = require('../config/config.js'),
    roomName = 'key_zero',
    assert = require('assert'),
    should = require('should'),
    io = require('socket.io-client'),
    request = require("request"),
    options = {
      transports: ['websocket'],
      'force new connection': true
    };

suite("Testing socket io", function ()
{
    /**
     * TEST SOCKET IO : get leaderboard & update one user from shared leaderboard data
     *      -> retrieve leaderboard
     *      -> check data from upon 'update' event ( JSON : multiple users and their data )
     *      -> update user with same API key from the client that have the previous leaderboard requested
     *      -> should catch another 'update' event emitted from socket server with only one user, the one that the test send POST with points earned
     */
    
    server = require('../server').server; // get server
    
    test("Socket IO & REST API, ask for leaderboard /> updt it /> check data stream", function (done)
    {
        // create client with socket on client side
        var client = io.connect('http://127.0.0.1:' + CONF.PORT, options),
            userData = {
                username    : '1',
                apiKey      : "key_zero",
                points      : '10'
            };
        
        client.on("connect", function () // connect to socket the server
        {
            client.emit('leaderboard', { room : roomName }); // request leaderboard with API key
            
            client.on('update', function (data) // catch 'update' event sent from socket server
            {
                data.should.be.a('object');
                if(data.users != null && data.users != undefined){ // when retrieve leaderboard
                    request.post( // send an update event for user
                        'http://127.0.0.1:' + CONF.PORT + '/update',
                        { form : userData },
                        function (err, resp, body)
                        { // test success
                            assert(resp.statusCode === 200);
                            assert(!err);
                            body.should.equal('1');
                        }
                    );
                } // catch update event just sent previously that was emitted for all the user who requested the leaderboard
                else if(data.user != null && data.user != undefined){
                    data.user.should.have.property("username");
                    data.user.username.should.be.equal(userData.username);
                    data.user.should.have.property("apiKey");
                    data.user.apiKey.should.be.equal(userData.apiKey);
                    data.user.should.have.property("points");
                    data.user.points.should.be.equal(userData.points);
                    client.disconnect();
                    done();
                }
            });
        });
    });
});