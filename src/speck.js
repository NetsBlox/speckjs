const { printBinary, mod, lcs, rcs, asciiToBits, chopString } = require('./utils');
const exSpeck = require('speck');

// Simon 2n/mn => 2n bit block, m-word, mn bit key

// turn a key into a sequence of rounds keys

// TODO 32 bit LCR to 16bit
class Speck {
  constructor() {
    // parameters from the original paper p18
    this.wordSize = 16; // n
    this.numKeyWords = 4; // m
    this.numRounds = 22;

    console.log(`creating Speck(${2*this.wordSize}/${this.numKeyWords*this.wordSize})`)

    if (this.wordSize === 16) {
      this.alpha = 7;
      this.beta = 2;
    } else {
      this.alpha = 8;
      this.beta = 3;
    }

  }

  keySchedule(key) {
    // build the initial L and K CHECK
    const m = this.numKeyWords;

    let pieces =chopString(key, 2*m-4)
    let l = new Array(m - 2).fill(null);
    let k = new Array(m - 2).fill(null);
    while (pieces.length) {
      l.push(parseInt(pieces.shift(), 2));
      k.push(parseInt(pieces.shift(), 2));
    }

    for (let i=0; i<this.numRounds-1; i++) {
      const moduloBase = Math.pow(2, this.wordSize);
      // calc l
      let leftT = mod(k[i] + rcs(l[i], this.alpha), moduloBase)
      l[i+m-1] = leftT ^ i;

      // calc k
      leftT = lcs(k[i], this.beta);
      k[i+1] = leftT ^ l[i+m-1];
    }

    return k;
  }

  _round(x, y, rKey) {
    let pair = [];
    // calc x
    let leftTerm = mod(rcs(x, this.alpha) + y, Math.pow(2, this.wordSize)); // modulo addition
    // CHECK override x here?
    x = leftTerm ^ rKey;
    y = lcs(y, this.beta) ^ x;
    return [x, y];
  }

  // inverse round
  _roundI(x, y, rKey) {
    y = rcs(x ^ y, this.beta);
    let leftT = mod((x ^ k) - y, Math.pow(2, this.wordSize)); // modulo subtraction
    x = lcs(leftT, this.alpha);
    return [x, y];
  }

  encrypt(x, y, key) {
    let rKeys = this.keySchedule(key);
    for (let i=0; i<this.numRounds; i++) {
      [x, y] = this._round(x, y, rKeys[i]);
    }
    return [x, y];
  }

  decrypt() {

  }

  externalEncrypt() {

  }

  externalDecrypt() {

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


let s = new Speck();

console.log('plain text (int):', words(s32.Plaintext));

let enc = s.encrypt(s32.Plaintext.split(' ')[0], s32.Plaintext.split(' ')[1], s32.Key);
console.log('enc', enc);
console.log(enc.map(n => n.toString(16)));

words(s32.Plaintext).forEach(w => {
  console.log(w.toString(2).length);
  console.log(w.toString(2));
})
