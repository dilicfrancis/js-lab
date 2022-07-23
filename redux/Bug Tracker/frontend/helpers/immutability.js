//Updating Objects

const person = {
  name: "john",
  address: { street: "Pacific", city: "San Francisco", state: "CA" },
};
const newPerson = {
  ...person,
  name: "Alex",
  address: { ...person.address, street: "Brooks" },
};
//or
const anotherPerson = Object.assign({}, person, {
  name: "Alex",
  hair: "Black",
});

console.log(newPerson);

// Updating Arrays
const numbers = [1, 2, 3];

//adding
const addNumbers = [0, ...numbers, 4, 5];
//Using slice()
const numIndex = numbers.indexOf(3);
const added = [...numbers.slice(0, numIndex), 2.5, ...numbers.slice(numIndex)];

//removing
const remove = numbers.filter((n) => n !== 2);

//updating
const update = numbers.map((n) => (n === 2 ? 20 : n));

console.log(update);
