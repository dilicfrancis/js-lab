/*
Retrieve the starting index for the match, the length of the match and the actual match.
*/

const phrase =
  "First number: 32, and a second number 100. Here is the last number 15.";

const match = phrase.match(/\d+/);

console.log(match[0], match.index, match[0].length);
