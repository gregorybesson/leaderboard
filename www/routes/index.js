/*
 * Route to the index.html when method GET
 */



/**
 * Default router 
 * @param {Object} req, express auto send this param
 * @param {Object} res, express auto send this param
 */
exports.index = function (req, res)
{
    res.render('error/401', { title: '401', msg: 'Permission issue to see this page' });
};

/**
 * Default router, handle unknow route
 * @param {Object} req, express auto send this param
 * @param {Object} res, express auto send this param
 */
exports.err404 = function (req, res)
{
    res.render('error/404', { title: '404', msg: 'File not found' })
};

/**
 * LeaderBoard router 
 * @param {Object} req, express auto send this param
 * @param {Object} res, express auto send this param
 */
exports.leaderboard = function (req, res)
{
    res.render('index' , {
        title: 'Express',
        roomID : req.params.roomID
    });
};
