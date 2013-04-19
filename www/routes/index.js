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
exports.connection = function (req, res)
{
    if(req.params.type)
        res.render('index' + req.params.type , {
            title: req.params.roomID + "'s " + req.params.type,
            roomID : req.params.roomID
        });
};

/**
 * LeaderBoard router 
 * @param {Object} req, express auto send this param
 * @param {Object} res, express auto send this param
 */
exports.widget = function (req, res)
{
    if(req.params.type)
        res.render('widget/' + req.params.type , {
            title: req.params.roomID + "'s " + req.params.type,
            roomID : req.params.roomID
        });
};
