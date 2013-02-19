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
    res.redirect('/index.html');
};

/**
 * LeaderBoard router 
 * @param {Object} req, express auto send this param
 * @param {Object} res, express auto send this param
 */
exports.leaderboard = function (req, res)
{
    res.redirect('/index.html?roomID=' + req.params.roomID);
};

