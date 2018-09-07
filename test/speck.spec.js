const assert = require('assert'),
  utils = require('../src/utils'),
  Speck32 = require('../src/ciphers/speck.js')

describe('ciphers', function() {
  describe('speck', function() {
    const s32 = new Speck32();

    it('should encrypt two ways block sized texts', function() {
      const keyWords = [1918, 1110, 0908, 0100];
      const plainMessage = 'holahola';
      let encMsg = s32.encryptAscii(plainMessage, keyWords);
      let decryptedMsg = s32.decryptAscii(encMsg, keyWords);
      assert.deepEqual(decryptedMsg, plainMessage);
    })

    it('should encrypt two ways odd sized texts', function() {
      const keyWords = [1918, 1110, 0908, 0100];
      const plainMessage = 'holas';
      let encMsg = s32.encryptAscii(plainMessage, keyWords);
      let decryptedMsg = s32.decryptAscii(encMsg, keyWords);
      assert.deepEqual(decryptedMsg, plainMessage);
    })
  })
})
