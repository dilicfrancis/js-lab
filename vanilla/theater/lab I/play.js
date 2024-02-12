const country = "African Union";
const continent = "Africa";
let population = 1467023758;

console.log(continent, country, continent);

const isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

language = "Igbo";
// country = "USA";

console.log(population / 2);
console.log(population + 1);
console.log(population > 6000000);
console.log(population < 33000000);

let description =
  country +
  " is in " +
  continent +
  ", and its " +
  population +
  " people speak " +
  language;

description = `${country} is in ${continent}, and its ${population} people speak ${language}`;

console.log(description);

if (population > 33000000)
  console.log(`${country}'s population is above average`);
else
  console.log(
    `${country}'s population is ${33000000 - population} below average`
  );

// const numNeighbors = Number(
//   prompt("How many neighbor countries does your have?")
// );
// if (numNeighbors === 1) console.log("1 border");
// else if (numNeighbors > 1) console.log("several borders");
// else console.log("no borders");

const speaksEnglish = true;
const lessThan50Million = true;
const notAnIsland = true;
const criteriaMet = true;

if (speaksEnglish && lessThan50Million && notAnIsland && criteriaMet)
  console.log("There you go, Sarah.");
else console.log("Let me get back to you on that one:/");

switch (language) {
  case "Igbo":
    console.log("eastern");
    break;
  case "Hausa":
    console.log("northern");
    break;
  case "Yoruba":
    console.log("western");
    break;
  default:
    console.log("Let me get back with you on that...");
}

population > 33000000
  ? console.log("Above average population")
  : console.log("Below average population");
