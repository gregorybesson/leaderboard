/*
exports.approute = function ()
{
    return {
        start : function ()
        {
            console.log('approute');
        }
    }
};
*/
var PI = Math.PI;

exports.area = function (r) {
    return PI * r * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};