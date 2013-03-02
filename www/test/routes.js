var routes = require('../routes')
    , assert = require('assert');

suite("Testing Routes", function ()
{
    /**
     * TEST ROUTER TO 401 : routes.index() without any parameters
     *      -> must redirect to 401
     */
    test("should render page 401", function (done)
    {
        routes.index(
            {},
            {
                render: function (viewName, templateParameters)
                {
                    templateParameters.title.should.be.a('string');
                    templateParameters.title.should.equal("401");
                    done();
                }
            }
        )
    });
    
    /**
     * TEST ROUTER TO 404 : routes.err404() which handle express router for unknown page
     *      -> must redirect to 404
     */
    test("should render page 404", function (done)
    {
        routes.err404(
            {},
            {
                render: function (viewName, templateParameters)
                {
                    templateParameters.title.should.be.a('string');
                    templateParameters.title.should.equal("404");
                    done();
                }
            }
        )
    });
    
    /**
     * TEST ROUTER TO LEADERBARD : routes.leaderboard() which need one parameter, the client API key
     *      -> must redirect to leaderboard page
     */
    test("should render page containing leaderboard", function (done)
    {
        var API_KEY = 'key_zero', // Client API key to call our leaderboard service
            req = {
                params : {
                    roomID : API_KEY
                }
            };
        routes.leaderboard(
            req,
            {
                render: function (viewName, templateParameters)
                {
                    templateParameters.title.should.be.a('string');
                    templateParameters.roomID.should.equal(API_KEY); // returning value for API key should be the same as the one given as parameter
                    done();
                }
            }
        )
    });
});
