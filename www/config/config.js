/**
 * CONFIG FILE, to configure different environment [ DEV / PROD ]
 */
module.exports = (function(){
    switch(process.env.NODE_ENV){
        case 'development' :
            return {
                PORT        : 8333,
                DEBUG       : true,
                IO_LOG      : false,
                IO_ORIGINS  : '*:*',
                DB : {
                    PATH    : 'http://localhost/github/leaderboard/db/db.php'
                }
            };
        break;
        case 'production' :
            return {
                PORT        : 8080,
                DEBUG       : false,
                IO_LOG      : false,
                IO_ORIGINS  : '*:*',
                DB : {
                    PATH    : 'http://localhost/github/leaderboard/db/db.php'
                }
            };
        break;
        default :
            return {
                PORT        : 8333,
                DEBUG       : true,
                IO_LOG      : false,
                IO_ORIGINS  : '*:*',
                DB : {
                    PATH    : 'http://localhost/github/leaderboard/db/db.php'
                }
            };
        break;
    }
})();
