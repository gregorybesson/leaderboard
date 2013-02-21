/**
 * adfabUtils.js
 * 
 * Utility helper module
 */

module.exports = {
    /**
     * Test if an object is not null
     * @param {Object} el, object to test
     * @param {Object} optional, optional  parameter to check if the tested object is not null and not equal to this parameter
     */
    NotNull : function (el, optional)
    {
        if(optional != null && optional != undefined)
            return (el != null && el != undefined && el != optional);
        return (el != null && el != undefined);
    }
};
