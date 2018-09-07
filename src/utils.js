const { rolInt16, rorInt16 } = require('bitwise-rotation');

// js int length for bitwise operations (in form of two's complement)
const JSINTLENGTH = 32;
const ASCII_SIZE = 8;

// WARN positive dec
let dec2Bin = dec => {
  return (dec >>> 0).toString(2);
}

// ensure binary string is n bits
let ensureNBits = (str, n) => {
  diff = n - str.length;
  if (diff < 0) throw new Error(`input binary out of the defined alphabet range`);
  console.assert(diff >= 0);
  if (diff > 0) {
    let pad = '';
    for (let i=0; i < diff; i++) {
      pad += '0';
    }
    str = pad + str;
  }
  return str;
};


// padded string repr of num
let asciiCharToBinary =  c => {
  let decNum = c.charCodeAt(0); // CHECK UTF16 but also ASCII ?!
  let numStr = dec2Bin(decNum);
  numStr = ensureNBits(numStr, ASCII_SIZE);
  return numStr;
};

let binaryToAsciiChar =  binaryStr => {
  if (binaryStr.length !== ASCII_SIZE) throw new Error(`input has to be ${ASCII_SIZE} bits`);
  let c = String.fromCharCode(parseInt(binaryStr, 2));
  return c;
};


let printBinary = int => {
  let str = int.toString(2);
  console.log(str);
  return str;
};

let lcs = (xInt, nBits) => {
  if (nBits === undefined) throw new Error('missing input: number of bits to shift is required');
  let res = (xInt << nBits | xInt >>> JSINTLENGTH-nBits)
  return res;
};

let rcs = (xInt, nBits) => {
  if (nBits === undefined) throw new Error('missing input: number of bits to shift is required');
  let res = (xInt << JSINTLENGTH-nBits | xInt >>> nBits)
  return res;
};

// FIXME there should be a way of avoiding strings..
let asciiToBits = str => {
  let bitRep = '';
  for (var n = 0, l = str.length; n < l; n ++)
  {
    bitRep += asciiCharToBinary(str[n]);
  }
  return bitRep;
};

let chopString = (str, blockSize) => {
  let re = new RegExp(`.{1,${blockSize}}`, 'g');
  return str.match(re);
};

/**
 * Computes x mod n
 * x arbitrary integer
 * n natural number
 */
const mod = (x, n) => (x % n + n) % n;

module.exports = {
  lcs,
  rcs,
  lcs16: rolInt16,
  rcs16: rorInt16,
  printBinary,
  asciiToBits,
  asciiCharToBinary,
  binaryToAsciiChar,
  ensureNBits,
  dec2Bin,
  chopString,
  mod,
}
