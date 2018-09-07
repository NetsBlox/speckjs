const assert = require('assert'),
  utils = require('../src/utils');

describe('utils', function() {

    it('chop should work on indivisible lengths', function() {
      let res = utils.chopString('12345', 2);
      let expected = ['12', '34', '5'];
      assert.deepEqual(res, expected);

      res = utils.chopString('1234', 2);
      expected = ['12', '34'];
      assert.deepEqual(res, expected);
    });



  describe('lcs', function() {

    it('should lcs 1 to 8 with 3bit', function() {
      assert.deepEqual(utils.lcs(1, 3), 8);
    });

    it('should not change with 32 bit rotation', function() {
      assert.deepEqual(utils.lcs(-100, 32), -100);
      assert.deepEqual(utils.lcs(1, 32), 1);
      assert.deepEqual(utils.lcs(24523, 32), 24523);
    });

    it('should do 30 bit rotation', function() {
      assert.deepEqual(utils.lcs(1, 30), Math.pow(2,30));
    });

    it('should lcs(1,31) should get -2^31', function() {
      assert.deepEqual(utils.lcs(1, 31), -1 * Math.pow(2,31));
    });

    it('should lcs(1,33) should get 2', function() {
      assert.deepEqual(utils.lcs(1, 33), 2);
    });

    describe('16 bit', function() {

      it('should not change with 16 bit rotation', function() {
        assert.deepEqual(utils.lcs16(1, 16), 1);
        assert.deepEqual(utils.lcs16(24523, 16), 24523);
        assert.deepEqual(utils.lcs16(-100, 16), -100);
      })

    })

  }); // end of lcs tests

  describe('rcs', function() {

    it('should rcs 2 by 1 bit to 1', function() {
      assert.deepEqual(utils.rcs(2, 1), 1);
    });

    it('should not change with 32 bit rotation', function() {
      assert.deepEqual(utils.rcs(-100, 32), -100);
      assert.deepEqual(utils.rcs(1, 32), 1);
      assert.deepEqual(utils.rcs(24523, 32), 24523);
    });

    it('should do 30 bit rotation', function() {
      assert.deepEqual(utils.rcs(Math.pow(2,30), 30), 1);
    });

    it('should rcs(1,2) should get 2^30', function() {
      assert.deepEqual(utils.rcs(1, 2), Math.pow(2,30));
    });

    it('should rcs(1,1) should get -2^31', function() {
      assert.deepEqual(utils.rcs(1, 1), -1 * Math.pow(2,31));
    });

    describe('16 bit', function() {

      it('should not change with 16 bit rotation', function() {
        assert.deepEqual(utils.rcs16(1, 16), 1);
        assert.deepEqual(utils.rcs16(24523, 16), 24523);
        assert.deepEqual(utils.rcs16(-100, 16), -100);
      })

    })


  }); // end of rcs tests

  describe('binary', function() {

    it('should convert ascii char to padded binary', function() {
      const expected = '00100000';
      let str = utils.asciiCharToBinary(' ')
      assert.deepEqual(str, expected);
    })

    it('should convert message to binary', function() {
      const expected = '01110011011001010111010000100000';
      let str = utils.asciiToBits('set ');
      assert.deepEqual(str, expected);
    })

  })

});
