function add(a, b) {
  return a + b;
}

//Currying allows us to convert a function with many args to just one arg.

//the above in currying:

function add(a) {
  return function (b) {
    return a + b;
  };
}

const result = add(5);
result(4); //returns 9

console.log(add(4)(5)); // so with currying instead of separating functions as args, we separate them as successive functions.

//In arrow function notation

const arrAdd = (a) => (b) => a + b;
console.log(arrAdd(1)(3));
