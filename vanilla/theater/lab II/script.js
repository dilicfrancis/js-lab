"use strict";

function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const country1 = describeCountry("Nigeria", 125, "Abuja");
const country2 = describeCountry("Togo", 0.7, "Lome");
const country3 = describeCountry("Algeria", 13, "Algiers");

console.log(country1);
console.log(country2);
console.log(country3);

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const population1 = percentageOfWorld1(57);
const population2 = percentageOfWorld1(27);
const population3 = percentageOfWorld1(83);

console.log(population1);
console.log(population2);
console.log(population3);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const population4 = percentageOfWorld2(57);
const population5 = percentageOfWorld2(27);
const population6 = percentageOfWorld2(83);

console.log(population4);
console.log(population5);
console.log(population6);

const percentageOfWorld3 = (population) => (population / 7900) * 100;

const describePopulation = (country, population) =>
  `${country} has ${population} million people, which is about ${percentageOfWorld1(
    population
  )}% of the world.`;

const desc1 = describePopulation("Uganda", 57);
const desc2 = describePopulation("Tanzania", 27);
const desc3 = describePopulation("Angola", 83);

console.log(desc1);
console.log(desc2);
console.log(desc3);

const populations = new Array(285, 638, 729, 573);
populations.length === 4 ? console.log(true) : console.log(false);

const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];

console.log(percentages);

const neighbors = new Array("Angola", "Tanzania", "Congo");

console.log(neighbors.push("Ethiopia"));
console.log(neighbors);
neighbors.pop(length - 1);
console.log(neighbors);

neighbors.includes("Germany") ? console.log("Yes") : console.log("No");

neighbors[1] = "Algeria";

console.log(neighbors);

const myCountry = {
  country: "Gambia",
  capital: "Banjul",
  language: [
    "Mandinka",
    "Pulaar",
    "Wolof",
    "Soninke",
    "Jola",
    "Serer",
    "Manjak",
    "Bainouk",
  ],
  population: 2.64,
  neighbor: ["Senegal"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language[3]}-speaking people, ${this.neighbor.length} neighboring country and a capital called ${this.capital}.'`
    );
  },
  checkIsland: function () {
    this.isIsland = this.neighbor.length === 0 ? true : false;
  },
};

console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language[3]}-speaking people, ${myCountry.neighbor.length} neighboring country and a capital called ${myCountry.capital}.'`
);
// const populationPlus = myCountry.population + 2;
console.log(
  `${myCountry.country} has ${myCountry.population + 2} million ${
    myCountry.language[3]
  }-speaking people, ${
    myCountry.neighbor.length
  } neighboring country and a capital called ${myCountry.capital}.'`
);
console.log(
  `${myCountry.country} has ${myCountry["population"] - 2} million ${
    myCountry.language[3]
  }-speaking people, ${
    myCountry.neighbor.length
  } neighboring country and a capital called ${myCountry.capital}.'`
);

console.log("----break----");

myCountry.describe();
myCountry.checkIsland();
console.log(myCountry);

for (let i = 1; i <= 50; i++) {
  console.log(`voter number ${i} is currently voting`);
}

console.log(populations);

const percentages2 = [];

for (let i = 0; i <= populations.length - 1; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
}

console.log(percentages2);
console.log(percentages);

console.log(percentages.sort().join(",") === percentages2.sort().join(","));

const listOfNeighbors = [
  ["Libya", "Senegal"],
  ["Algeria"],
  ["Congo", "Kenya", "Uganda"],
];

for (let i = listOfNeighbors.length - 1; i >= 0; i--) {
  for (let k = listOfNeighbors[i].length - 1; k >= 0; k--) {
    console.log(`Neighbor: ${listOfNeighbors[i][k]}`);
  }
}

const percentages3 = [];

let i = 0;
while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++;
}

console.log(percentages3);
console.log(percentages.sort().join(",") === percentages3.sort().join(","));


const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}


const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++){
    tips.push(calcTip(bills[i]));
    totals.push(calcTip(bills[i]) + bills[i]);
}

console.log(tips);
console.log(totals);

function calcAverage(arr){
    let arrTotal = 0
    for (let i=0; i < arr.length; i++){
        arrTotal += arr[i]
    }
    
    return arrTotal / arr.length
}

console.log(calcAverage(totals))
