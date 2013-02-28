var assert = require('assert')
    , adfabUtils = require('./../lib/adfabUtils.js');

suite('adfabUtils', function ()
{
    /**
     * TEST UTILITY FUNCTION CALL : NotNull() which retrieve true if the first param is not null AND not undefined
     */
    test('function NotNull() should return true if param is not null', function ()
    {
        assert.equal(
            true,
            adfabUtils.NotNull(
                {} // Object is not null so it should return 'TRUE'
            )
        );
    });
    
    /**
     * TEST UTILITY FUNCTION CALL : NotNull() which retrieve false if the first param is null OR undefined
     */
    test('function NotNull() should return false if param is not null OR undefined', function ()
    {
        assert.equal( // Check for null vaue
            false,
            adfabUtils.NotNull(
                null // null is passed as arguments so it should return 'FALSE' as NULL is equal NULL
            )
        );
        assert.equal(// Check for undefined vaue
            false,
            adfabUtils.NotNull(
                undefined // undefined is passed as arguments so it should return 'FALSE' as undefined is equal undefined
            )
        );
    });

});
