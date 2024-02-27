/*
Iterate through the data provided. Use a regular expression to store the names in a new array but change the order of the name so first name is listed first and last name is last. 
*/

let data = [
  "Jensen, Dale",
  "Smith, Andrea",
  "Jorgensen, Michael",
  "Vasefi, Annika",
  "Lopez, Monica",
  "Crockett, Steven",
];

// const newArr = data.map((e) => {
//   const match = /(\w+), (\w+)/.exec(e);
//   //   console.log(match);
//   if (match) return `${match[2]} ${match[1]}`;
// });

const newArr = data.map((e) => {
  //each name tag created will be added to the 'group' object in the result as a <tag> : value pair.
  const match = /(?<lastName>\w+), (?<firstName>\w+)/.exec(e);
  //   console.log(match);
  if (match) return `${match.groups.firstName} ${match.groups.lastName}`;
});

console.log(newArr);
