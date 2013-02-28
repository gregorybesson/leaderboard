var assert = require('assert')
    , User = require('./../models/User.js')
    , should = require('should');

suite('User', function ()
{
    /**
     * TEST AJAX FUNCTION CALL : getUsers() which retrieve JSON containing several users
     * 
     * Check for :
     *      type -> {Object}
     * 
     * Then select first item in Users JSON and :
     *      prop -> {String} username
     *      prop -> {String} total_points
     *      prop -> {String} last_updt
     */
    test('function getUsers() should return JSON Object', function(done) {
        User.getUsers(
            'key_second',       // API_KEY
            0,                  // Start index
            10,                 // Number of users
            function (response) // callBack
            { 
                // Cast to JS object
                response = JSON.parse(response).users;
                // Type
                response.should.be.a('object');
                // Prop
                response[0].should.have.property("username");
                response[0].should.have.property("total_points");
                response[0].should.have.property("last_updt");
                done();
            }
        )
    });
    
    /**
     * TEST AJAX FUNCTION CALL : updtUsersPoints() which retrieve a number == 1, because 1 is printed by PHP if the request worked and 0 wich is false if not
     */
    test('function updtUsersPoints() should return a number equal to 1', function(done) {
        User.updtUsersPoints(
            1,                      // ID user
            20,                     // Points earned
            function (err, response)// callBack
            {
                // Cast to number
                response = parseInt(response);
                // Type
                response.should.be.a('number');
                // Value for prop
                response.should.be.equal(1);
                done();
            }
        )
    });
});

