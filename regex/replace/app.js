/*
Create a new array that shows the names with the firstname and then the surname.
*/

const names = [
  "Smith, James",
  "Peterson, Alyssa",
  "Johnson, Lynette",
  "Lopez, Tony",
];

const switchNames = names.map((e) => e.replace(/(\w+), (\w+)/, "$2 $1"));

console.log(switchNames);
