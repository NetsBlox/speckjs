const { printBinary, mod, lcs16, rcs16, asciiToBits, chopString } = require('../utils'),
  BlockCipher = require('../blockCipher');

class SpeckNative32 extends BlockCipher {
  constructor() {
    super(16, 4, 22);
    this.alpha = 7;
    this.beta = 2;
  }

  _expandKey(keyWords) {
    super._expandKey(keyWords);
    let rKeys = [];
    // build the initial L and K CHECK
    const m = this.m;
    // l2, k2, l1, k1, l0, k0 = 4*16 bits
    // QUESTION how should this assignmet be done?

    // let l = new Array(m - 2 + 1).fill(null);
    // let k = new Array(m - 2 + 1).fill(null);

    // l[0] = k[0] = keyWords[3]


    // for (let i=0; i<this.numRounds-1; i++) {
    //   const moduloBase = Math.pow(2, this.n);
    //   // calc l
    //   let leftT = mod(k[i] + rcs16(l[i], this.alpha), moduloBase)
    //   l[i+m-1] = leftT ^ i;

    //   // calc k
    //   leftT = lcs16(k[i], this.beta);
    //   k[i+1] = leftT ^ l[i+m-1];
    // }
    // rKeys = k;


    // credit: speck package
    let key = [...keyWords]; // shallow copy to dereference
    var k = key[3];
    for (var i = 0, j; i < this.numRounds; ++i) {
        rKeys[i] = k;
        j = 2 - i % 3;
        key[j] = (key[j] << 9 | key[j] >>> 7) + k & 65535 ^ i;
        k = (k << 2 | k >>> 14) & 65535 ^ key[j];
    }

    return rKeys;
  }

  _round(x, y, rKey) {
    // calc x
    let leftTerm = mod(rcs16(x, this.alpha) + y, Math.pow(2, this.n)); // modulo addition
    // CHECK override x here?
    x = leftTerm ^ rKey;
    y = lcs16(y, this.beta) ^ x;

    return [x, y];
  }

  // inverse round
  _roundI(x, y, rKey) {
    y = rcs16(x ^ y, this.beta);
    let leftT = mod((x ^ rKey) - y, Math.pow(2, this.n)); // modulo subtraction
    x = lcs16(leftT, this.alpha);
    return [x, y];
  }

  // input: 2 words (a block) and a list of round keys
  _encrypt(words, rKeys) {
    // console.log('input words to encrypt', words);
    let [x, y] = words;
    for (let i=0; i<this.numRounds; i++) {
      [x, y] = this._round(x, y, rKeys[i]);
    }
    return [x, y];
  }

  _decrypt(words, rKeys) {
    // console.log('input words to decrypt', words);
    let [x, y] = words;
    for (let i=this.numRounds-1; i >= 0; i--) {
      [x, y] = this._roundI(x, y, rKeys[i]);
    }
    return [x, y];
  }
}

module.exports = SpeckNative32;
