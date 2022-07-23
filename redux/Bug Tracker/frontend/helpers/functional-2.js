import { compose, pipe } from "lodash/fp";

let input = "            C#    ";
//let output = "<div>" + input.trim() + "</div"; // non functional approach;

//functional approach [trim and wrapInDiv]

//const trim = (str) => str.trim();
// const div = (str) => "<div>" + str + "</div>";
// const span = (str) => "<span>" + str + "</span>";
const toLower = (str) => str.toLowerCase();

//output = div(toLower(trim(input))); // this is called function composition

//using lodash to improve code readability

//const transform = compose(div, toLower, trim); //reference the functions, not call them () - also, observe the compose is a higher order function accepting out functions as argument.
//const transform = pipe(trim, toLower, div); //applies function from the first to last | compose applies from last to first
// transform(input);

//Currying: instead of repeating code as above, we can:

const trim = (str) => str.trim();
const wrap = (tag) => (str) => `<${tag}>${str}</${tag}>`;
const transform = pipe(trim, toLower, wrap("div")); //applies function from the first to last | compose applies from last to first
console.log(transform(input));
