const text =
  "“People demand freedom of speech as a compensation for the freedom of thought which they seldom use";

const regText = new RegExp(text); // constructor syntax
const regAlt = /text/; // literal syntax

console.log(regText.test(text)); // returns a boolean
console.log(regAlt.test(text));

console.dir(regText);

// Regular Expression Object Methods //
//test() : returns a boolean confirming whether or not a match for the argument was found in the object
console.log(regText.test(text)); // returns a boolean
console.log(regAlt.test(text));

//exec() : returns an array with ONE match (even when g flag is used) and the index of the match within the stream. Also returns the stream input.
//with the g flag, subsequent searches ON THE SAME VARIABLE (memory reference) will begin from the last returned result to fetch the next single match
console.log(regText.exec(text)); // returns an array with the match
console.log(regAlt.exec(text));

// Regular Expression String Methods //
//match() - similar to exec(), but returns ALL matches in an array when used with the g flag. Each return also contains the index of the match within the stream as well as the stream input.
//with the g flag, returns ALL matches
console.log(text.match(regAlt));

//search() - return only the index of the match, or -1 for no match.
console.log(text.search(regAlt));

//replace() - returns a new string that replaces the match with a different text. Does not mutate the input string.
console.log(text.replace(regAlt, "replacement"));

//split() - splits the text stream into multiple arrays base on the occurrences of their match to the argument. The argument used as a delimiter is NOT included in the resulting arrays.
console.log(text.split(/\s/));
