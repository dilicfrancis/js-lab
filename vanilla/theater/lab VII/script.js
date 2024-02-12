'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const { team1, x: draw, team2 } = game.odds;

function printGoals(...players) {
  console.log(...players);
}

printGoals(...game.scored);

team1 < team2 && console.log('Team 1');
team1 < team2 && console.log('Team 2');

for (const goal of game.scored.entries())
  console.log(`Goal ${goal[0] + 1}: ${goal[1]}`);

let oddsArr = Object.values(game.odds);
let avgOdds = 0;
for (const odd of oddsArr) avgOdds += odd;
avgOdds /= oddsArr.length;
console.log(avgOdds);

//misunderstood request? lol smh
console.log(`Odds of victory ${game.team1}: ${game.odds.team1}`);
console.log(`Odds of draw: ${game.odds.x}`);
console.log(`Odds of victory ${game.team2}: ${game.odds.team2}`);

const scorers = {};
for (const lastName of game.scored) {
  scorers[lastName] = scorers[lastName] + 1 || 1;
}
console.log(scorers);

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// let avgMin = 0;
// for (const [min] of gameEvents) avgMin++;
// console.log(`An event happened, on average, every ${90 /avgMin} minutes`);
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

for (const [minute, event] of gameEvents)
  console.log(
    `${minute < 45 ? '[FIRST HALF]' : '[SECOND HALF'} ${minute}: ${event}`
  );

//DOM
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

function convertVariables(entry) {
  const sanitizedEntry = [];
  let length = 21;
  for (const item of entry) sanitizedEntry.push(item.trim().toLowerCase());
  for (const item of sanitizedEntry) {
    const firstWord = item.slice(0, item.indexOf('_'));
    const secondWord = item.slice(item.indexOf('_') + 1);
    const capitalize = secondWord[0].toUpperCase() + secondWord.slice(1);
    const carmelWord = firstWord + capitalize + ' ';
    const padding = carmelWord.padEnd(20, ' ');
    const styled = padding.padEnd(length++, '✅');
    console.log(styled);
  }
}

document.querySelector('button').addEventListener('click', function () {
  const entry = document.querySelector('textarea').value.split('\n');
  convertVariables(entry);
});

// Better approach
/*
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/
