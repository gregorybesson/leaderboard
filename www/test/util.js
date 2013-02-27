var assert = require('assert')
  , adfabUtils = require('./../lib/adfabUtils.js');

suite('adfabUtils', function ()
{
    
    test('function NotNull() should return true if param is not null', function ()
    {
        assert.equal(
            true,
            adfabUtils.NotNull(
                {} // Object is not null so it should return 'TRUE'
            )
        );
    });
    
    test('function NotNull() should return false if param is not null OR undefined', function ()
    {
        assert.equal(
            false,
            adfabUtils.NotNull(
                null // null is passed as arguments so it should return 'FALSE' as NULL is equal NULL
            )
        );
        assert.equal(
            false,
            adfabUtils.NotNull(
                undefined // undefined is passed as arguments so it should return 'FALSE' as undefined is equal undefined
            )
        );
    });

});
