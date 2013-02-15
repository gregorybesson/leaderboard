
function AppRouter () {
    thi
    
    
    return this;
}

AppRouter.prototype.initApp = function (app, ex, serverDirName)
{
    this.app = app;
    this.__ServerDirName = serverDirName;
    if(ex != null && ex != undefined) this.setConf(ex);
};

AppRouter.prototype.getApp = function ()
{
    return this.app;
};

AppRouter.prototype.setConf = function (ex)
{
    var _this = this;
    this.app.configure(function ()
    {
        _this.app.use(ex.bodyParser());
        _this.app.use(ex.methodOverride());
        _this.app.use(_this.app.router);
        _this.app.use(ex.static(__dirname + '/public'));
    });
};
/*
AppRouter.index = function (req, res)
{
    res.sendfile(this.__ServerDirName + '/public/index.html');
};
*/
exports.AppRouter = new AppRouter();
/*
(function()
{

    this.AppRouter = (function()
    {
        
        function AppRouter()
        {
            
        }
        
        AppRouter.prototype.initApp = function(evtName) 
        {
            this.app = app;
            if(ex != null && ex != undefined) this.setConf(ex);
        };
        
        AppRouter.prototype.getApp = function(evtName) 
        {
            return this.app;
        };
        
        AppRouter.prototype.setConf = function(evtName) 
        {
            var _this = this;
            this.app.configure(function ()
            {
                _this.app.use(ex.bodyParser());
                _this.app.use(ex.methodOverride());
                _this.app.use(_this.app.router);
                _this.app.use(ex.static(__dirname + '/public'));
            });
        };
        
        return AppRouter;

    })();

}).call(this);

exports.AppR = new AppRouter();
*/