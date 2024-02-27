/*
Extract all the numbers from this phrase and capture those numbers. Then sum the numbers.
*/

const phrase =
  "First number: 32, and a second number 100. Here is the last number 15.";

const total = phrase.match(/\d+/g).reduce((e, acc) => +e + +acc);

console.log(total);
