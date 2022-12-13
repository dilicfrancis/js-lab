// var container = [1, 2, 3, 4];

// function looper(array, func) {
//   var funcArray = [];
//   for (var i = 0; i < array.length; i++) {
//     funcArray.push(func(array[i]));
//   }
//   return funcArray;
// }

// var mapper = looper(container, function (item) {
//   return item > 2;
// });
// //console.log(mapper);

// var check = function (limit) {
//   return function (ceiling, number) {
//     console.log(ceiling, number);
//     return number > ceiling;
//   }.bind(this, limit);
// };

// var mapTask = looper(container, check(1));
// console.log(mapTask);

// function Person() {
//   this.firstname = "Jonah";
//   this.lastname = "Blink";
// }

// var jonah = new Person();

// var place = {
//   city: "San Francisco",
//   state: "CA",
//   getLocation: function () {
//     var location = this.city + " " + this.state;
//     return location;
//   },
// };

// var show = function (x, y) {
//   console.log("Location is " + this.getLocation());
// };

// var showLocation = show.bind(place);

// showLocation();

// function showPrompt() {
//   var show = "Prompt!";

//   setTimeout(function () {
//     console.log(show);
//   }, 1000);
// }

// showPrompt();

// function exito() {
//   let range = [];
//   for (var i = 0; i < 3; i++) {
//     //var overwites the same location in memory, let creates a seperate location for each iteration.
//     range.push(
//       (function () {
//         var j = i;
//         return function () {
//           console.log(j); //now executed here when invoked.
//         };
//       })()
//     );
//   }
//   return range;
// }

// const mountains = exito();
// mountains[0]();
// mountains[1]();
// mountains[2]();

// function exito() {
//   let range = [];
//   for (var i = 0; i < 3; i++) {
//     //var overwites the same location in memory, let creates a seperate location for each iteration.
//     range.push(function () {
//       var j = i;
//       console.log(j); //not executed here. Executed when invoked.
//     });
//   }
//   return range;
// }

// const mountains = exito();
// mountains[0]();
// mountains[1]();
// mountains[2]();

// function open(door) {
//   return function (thunk) {
//     console.log(door + " is made of " + thunk);
//   };
// }

// let apt = open("iron");
// console.log(apt);
// console.log(apt("wood"));

// b = { c: [4, 5] };
// f = b;
// g = b.c;
// f.c = [7, 8];
// console.log(f);
// console.log(b);
// console.log(g);

//Objects

// var person = new Object();

// person["firstname"] = "Dude";
// person["lastname"] = "Guy";

// var firstNameProperty = "firstname";

// console.log(person);
// console.log(person[firstNameProperty]);
// console.log(person.firstname);

// person.address = new Object();
// person.address.street = "234 new St";
// person.address.city = "San Francisco";
// person.address.state = "CA";

// console.log(person.address.state); //prefeered appraoch
// console.log(person["address"]["city"]); //preferred for programmatic access to objects.

// // long running function
// function waitThreeSeconds() {
//   var ms = 3000 + new Date().getTime();
//   while (new Date() < ms) {}
//   console.log("finished function");
// }

// var test = 45;

// function clickHandler() {
//   console.log("click event!");
//   console.log(test);
// }

// // listen for the click event
// document.addEventListener("click", clickHandler);

// waitThreeSeconds();
// console.log("finished execution");

// var a; //phase one of execution context will create a memory space for a and set it to undefined
// console.log(a);

// a = undefinded // avoid explicitely setting values to undefined - better clarity to tell JS engine assignments. Set to null instead.
// let undefined always mean "I didn't set this value"

// if (a === undefined)
//     console.log("a is undefined");
// else
//     console.log("a is defined");

//Creation of Memory space
// b();
// console.log(a);

// var a = "Hello World";

// function b() {
//   console.log("B!");
// }

// New approach
// b();
// console.log(a);

// var a = "Hello World";
// const b = () => {
//   console.log("B!");
// };
