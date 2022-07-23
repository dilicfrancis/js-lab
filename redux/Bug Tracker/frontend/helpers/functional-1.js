// Instance One: Function stored in a variable as a reference
function Hey() {
  return "Hey";
}

let a = Hey;

// a()
// /*is the equivalent to*/
// Hey()

//Instance Two: Function passed as an argument into another function

function say(fnArg) {
  console.log(fnArg());
}

say(Hey);

// Instance Three: Function return within another function

function greet() {
  return () => "Morning!";
}

const x = greet(); //executing returns the next expression which is a function
const y = x(); //executing also returns the next expression with is a value this time

console.log(greet());

// A higher order function takes a function as an argument, returns a function, or both!

//Example 1:

let num = [1, 2, 3, 4, 5];
num.map((n) => n + 1); //map is a higher order function here as it accepts another function as an argument inside it.

//Example 2:

setTimeout(() => "Time!", 1000); //setTimeout here is a higher order function as it accepts a function in its argument.
