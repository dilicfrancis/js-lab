/*
Iterate over each match and log the information to the console.
*/

const phrase =
  "First number: 32, and a second number 100. Here is the last number 15.";
const regex = /\d+/g;

const match = phrase.match(regex).map((e) => regex.exec(phrase));
// const match = phrase.matchAll(regex);
// console.log(match.next());
// console.log(match.next());
// console.log(match.next());

match.forEach((e) => console.log(e[0], e.index, e[0].length));
