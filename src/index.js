const { printBinary, mod, lcs, rcs, asciiToBits, chopString } = require('./utils');
const Speck = require('./speck/lib');


// fiestel block encryption helper
class BlockEnc {
  /*
  * @param {Number} n word size in bits
  * @param {Number} m number of keywords
  */
  constructor(n, m) {
    if (!n || !m) throw new Error('missing initialization parameters');
    console.log(`creating block cipher with block size: ${2*n} key size: ${m*n}`);
    this.m = m;
    this.n = n;
    this.MAX_KEY = Math.pow(2, m * n);
    this.MAX_WORD = Math.pow(2, n);
  }

  _checkKeyWords(keyWords) {
    if (!Array.isArray(keyWords) || keyWords.length !== this.m) throw new Error('bad key words');
    keyWords.forEach(key => {
      if (isNaN(key) || key > this.MAX_WORD) throw new Error('bad key word', key);
    })
  }

  /*
  * @param {Array<Number>} keyWords a list of key words containing numbers up to word size
  * @returns {Array<Number>} round keys: a list of round keys
  */
  _expandKeys(keyWords) {
    this._checkKeyWords(keyWords);
    // override
  }

  /*
  * @param {Array<Number>} words a list of 2 words (a block)
  * @param {Array<Number>} rKeys: a list of round keys
  */
  _encrypt(words, rKeys) {
    // override
  }

  /*
  * @param {Array<Number>} words a list of 2 words (a block)
  * @param {Array<Number>} rKeys: a list of round keys
  */
  _decrypt(words, rKeys) {
    // override
  }

  /*
  * @param {string} text ascii text to encrypt (8bit encoded)
  * @param {Array<Number>} keyWords a list of key words containing numbers up to word size
  */
  encryptAscii(text, keyWords) {
    if (text === undefined) throw new Error('bad input');
    let roundKeyds = this._expandKeys(keyWords);
  }

  /*
  * @param {string} text ascii text to encrypt (8bit encoded)
  * @param {Array<Number>} keyWords a list of key words containing numbers up to word size
  */
  decryptAscii(text, keyWords) {
    if (text === undefined) throw new Error('bad input');

  }
}



function words(s) {
  return s.split(/\s+/).map(function (x) { return parseInt(x, 16) | 0 })
}

const s32 = {
  Key: '1918 1110 0908 0100',
  Plaintext: '6574 694c',
  // Plaintext: '20796c 6c6172',
  Ciphertext: 'a868 42f2'
};



// console.log('plain text (int):', words(s32.Plaintext));

// let enc = speck32.encrypt(s32.Plaintext.split(' ')[0], s32.Plaintext.split(' ')[1], s32.Key);
// console.log('enc', enc);
// console.log(enc.map(n => n.toString(16)));

// words(s32.Plaintext).forEach(w => {
//   console.log(w.toString(2).length);
//   console.log(w.toString(2));
// })
