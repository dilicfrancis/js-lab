// //Callback Pattern
// const callbackPattern = (callback) => {
//   setTimeout(() => callback("error", undefined), 1500);
// };

// callbackPattern((error, result) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(result);
// });

// //Promise Pattern

// const promisePattern = new Promise((resolve, reject) =>
//   setTimeout(() => resolve("Yay"), 1500)
// );

// promisePattern.then((res) => console.log(res)).catch((err) => console.log(err));

//Promises Chaining

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(a * b), 2000);
  });
};

add(2, 6)
  .then((sum) => add(sum, 8))
  .then((sum) => console.log(sum))
  .catch((err) => console.log("error " + err));
