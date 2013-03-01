var CONF = require('../config/config.js'),
    assert = require('assert'),
    request = require("request");

suite("Testing node server", function ()
{
    /**
     * TEST SERVER : listening to the conf specified port
     *      -> must retrieve status code 200
     */
    test("listens on the specified ENV port", function (done)
    {
        request('http://127.0.0.1:' + CONF.PORT, function (err, resp, body)
        {
            assert(resp.statusCode === 200);
            done();
        });
    });
    
    /**
     * TEST SERVER : request html page with [html / css / js] which create leaderboard
     *      -> must retrieve status code 200
     *      -> must be html
     *      -> must be error free ( err == null )
     */
    test("request leaderboard for API key = key_zero", function (done)
    {
        request('http://127.0.0.1:' + CONF.PORT + '/leaderboard/key_zero', function (err, resp, body)
        {
            assert(resp.statusCode === 200);
            resp.should.be.html; // Could have done -> [ resp.headers["content-type"].should.equal("text/html; charset=utf-8"); ] BUT header already tested with "should.be.html"
            assert(!err);
            done();
        });
    });
});
