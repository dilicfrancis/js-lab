'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/*
// Data 1
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//End of Data 1 
*/

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-12-16T17:01:17.194Z',
    '2023-12-18T23:36:17.929Z',
    '2023-12-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const startLogOutTimer = () => {
  let time = 300;

  const ticker = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  ticker();
  const timer = setInterval(ticker, 1000);
  return timer;
};

const formatDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${month}/${day}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const currencyFormat = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

const displayMovements = (acct, sort = false) => {
  containerMovements.innerHTML = '';
  // containerMovements.textContent = 0;

  const sortedMovements = sort
    ? acct.movements.slice().sort((a, b) => a - b)
    : acct.movements;

  sortedMovements.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acct.movementsDates[i]);
    const happened = formatDate(date, customer.locale);

    // const currencyFormat = new Intl.NumberFormat(acct.locale, {
    //   style: 'currency',
    //   currency: acct.currency,
    // }).format(movement);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${happened}</div>
      <div class="movements__value">${
        currencyFormat(
          movement,
          acct.locale,
          acct.currency
        ) /*movement.toFixed(2)*/
      }</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);
// console.log(containerMovements.textContent);

//display balance
const calcDisplayBalance = acct => {
  acct.balance = acct.movements.reduce(
    (accumulation, movement) => accumulation + movement,
    0
  );
  labelBalance.textContent = currencyFormat(
    acct.balance,
    acct.locale,
    acct.currency
  );

  // `${acct.balance.toFixed(2)}`;
};

// calcDisplayBalance(account1.movements);
const calcDisplaySummary = acct => {
  const incomes = acct.movements
    .filter(m => m > 0)
    .reduce((acc, m) => acc + m, 0);
  labelSumIn.textContent = currencyFormat(incomes, acct.locale, acct.currency);
  // `${incomes.toFixed(2)}`;

  const outflows = acct.movements
    .filter(m => m < 0)
    .reduce((acc, m) => acc + m, 0);
  labelSumOut.textContent = currencyFormat(
    Math.abs(outflows),
    acct.locale,
    acct.currency
  ); //`${Math.abs(outflows).toFixed(2)}€`;

  const interest = acct.movements
    .filter(m => m > 0)
    .map(m => (m * acct.interestRate) / 100)
    .filter(m => m >= 1)
    .reduce((acc, m) => acc + m, 0);
  labelSumInterest.textContent = currencyFormat(
    interest,
    acct.locale,
    acct.currency
  ); //`${interest.toFixed(2)}€`;
};

// const calcDisplaySummary = movements => {
//   const incomes = movements.filter(m => m > 0).reduce((acc, m) => acc + m, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   const outflows = movements.filter(m => m < 0).reduce((acc, m) => acc + m, 0);
//   labelSumOut.textContent = `${Math.abs(outflows)}€`;

//   const interest = movements
//     .filter(m => m > 0)
//     .map(m => m * 0.012)
//     .filter(m => m >= 1)
//     .reduce((acc, m) => acc + m, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };
// calcDisplaySummary(account1.movements);

//create usernames
const createUsernames = accts => {
  accts.forEach(acct => {
    acct.username = acct.owner
      .toLowerCase()
      .split(' ')
      .map(ownersName => ownersName[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUIState = customer => {
  //Display movements
  displayMovements(customer);

  //Display balance
  calcDisplayBalance(customer);

  //Display summary
  calcDisplaySummary(customer);
};

//current customer
let customer = '';
let timer = 0;

//Login event
btnLogin.addEventListener('click', e => {
  //prevent default submit behavior
  e.preventDefault();
  customer = accounts.find(
    customer => customer.username === inputLoginUsername.value
  );
  // console.log(customer);

  if (customer?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${customer.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Set Dates
    const now = new Date();
    const options = {
      year: 'numeric',
      // month: 'long',
      month: 'numeric',
      day: 'numeric',
      // weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      customer.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;

    //Set Logout timer
    clearInterval(timer);
    timer = startLogOutTimer();

    //update UI state
    updateUIState(customer);

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    //Remove focus from login
    inputLoginPin.blur();
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcct = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  // console.log(receiverAcc);

  if (
    amount > 0 &&
    receiverAcct &&
    customer.balance >= amount &&
    receiverAcct?.username !== customer.username
  ) {
    customer.movements.push(-amount);
    receiverAcct.movements.push(amount);
    customer.movementsDates.push(new Date().toDateString());
    receiverAcct.movementsDates.push(new Date().toISOString());

    //Update UI state
    updateUIState(customer);
  }

  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value); //Math.floor will coerce the value from String into Number

  setTimeout(() => {
    if (amount > 0 && customer.movements.some(m => m >= amount * 0.1)) {
      customer.movements.push(amount);
      customer.movementsDates.push(new Date().toISOString());

      updateUIState(customer);
    }
  }, 5000);

  clearInterval(timer);
  timer = startLogOutTimer();

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === customer.username &&
    Number(inputClosePin.value) === customer.pin
  ) {
    const index = accounts.findIndex(i => i.username === customer.username);
    // .indexOf(0)
    accounts.splice(index, 1);

    //Hide login Area
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Close Complete.';
  }
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(customer, !sorted);
  sorted = !sorted;
});

//Sundry 1

/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Map Exercise
const eurToUsd = 1.1;

//arrow function
const movementsUSD_arr = movements.map(m => m * eurToUsd);
console.log(movements, movementsUSD_arr);

//regular function
const movementsUSD_reg = movements.map(function (m) {
  return m * eurToUsd;
});
console.log(movements, movementsUSD_reg);

//for statement
const movementsUSD_for = [];
for (const m of movements) movementsUSD_for.push(m * eurToUsd);
console.log(movementsUSD_for);

//Misc
const movementsDescriptions = movements.map(
  (m, i) =>
    `Movement ${i + 1}: You ${m > 0 ? 'deposited' : 'withdrew'} ${Math.abs(m)}`
);
console.log(movementsDescriptions);

//Filter Exercise
const deposits = movements.filter(m => m > 0);
console.log(movements, deposits);

const deposits_for = [];
for (const m of movements) if (m > 0) deposits_for.push(m);
console.log(deposits_for);

const withdrawals = movements.filter(m => m < 0);
console.log(withdrawals);

//Reduce Exercise
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const m of movements) balance2 += m;
console.log(balance2);

//Maximum value
const max = movements.reduce((acc, m) => (acc > m ? acc : m), movements[0]);
console.log(max);

//Chaining
// const eurToUsd = 1.1; //already declared above
const totalDepositsUSD = movements
  .filter(m => m > 0)
  .map(m => m * eurToUsd)
  .reduce((acc, m) => acc + m, 0);
console.log(totalDepositsUSD);

//Find Exercise
const firstWithdrawal = movements.find(m => m < 0);
console.log(firstWithdrawal);

const account = accounts.find(a => a.owner === 'Jessica Davis');
console.log(account);

let account_for = 0;
for (const a of accounts) {
  if (a.owner === 'Jessica Davis') {
    account_for = a;
    break; // this ensures the very first occurrence, and not the last, is selected. Also a stops iteration once match is found, hence a small performance boost.
  }
}
console.log(account_for);

/////Some Exercise
console.log(movements);
// Equality
console.log(movements.some(m => m === -130));
// Condition
const anyDeposits = movements.some(m => m > 0);
console.log(anyDeposits);
/////

/////Every Exercise
console.log(movements.every(m => m > 0));
//return account with only deposits and no withdrawals
console.log(account4.movements.every(m => m > 0));
//Separate callback
const deposit = m => m > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap - only goes one level deep. To go deeper, use the regular flat method.
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

////Array.from
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

///// Shadow boxes
const bankDepositSum = accounts
  .flatMap(acct => acct.movements)
  .filter(m => m > 0)
  .reduce((sum, item) => sum + item, 0);

console.log(bankDepositSum);

//

// const numDeposits1000 = accounts
// .flatMap(acct => acct.movements)
// .filter(m => m >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acct => acct.movements)
  // .reduce((count, item) => (item >= 1000 ? count + 1 : count), 0)
  .reduce((count, item) => (item >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

////

const { deposits2, withdrawals2 } = accounts
  .flatMap(acct => acct.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits2' : 'withdrawals2'] += cur;
      return sums;
    },
    { deposits2: 0, withdrawals2: 0 }
  );

console.log(deposits2, withdrawals2);

/////

// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//Using Remainder Algorithm to add patterns
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});


*/

//Side Plays

/*
//Dog Ages
const checkDogs = (dogsJulia, dogsKate) => {
  const actualDogsJulia = dogsJulia.slice(1, -2);
  // console.log(dogsJulia, actualDogsJulia);
  const dogsCollective = actualDogsJulia.concat(dogsKate);

  dogsCollective.forEach((age, i) => {
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy! `);
  });
};

// TEST DATA 1
const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];
checkDogs(juliaData1, kateData1);

// TEST DATA 2:
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];
checkDogs(juliaData2, kateData2);



const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, { length }) => acc + age / length, 0);

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(e => {
  e.recommendedFood = e.weight ** 0.75 * 28;
});

console.log(dogs);

//2
const sarahDog = dogs.find(e => e.owners.includes('Sarah'));

console.log(
  `Sarah's dog is eating ${
    sarahDog.curFood >= sarahDog.recommendedFood ? 'too much' : 'just right'
  }`
);

//3
const overfedOwners = dogs
  .filter(e => e.curFood > e.recommendedFood)
  // .map(e => e.owners.join(', '))
  .flatMap(e => e.owners);
// .join(', ');
console.log(overfedOwners);

const underfedDogOwners = dogs
  .filter(e => e.curFood < e.recommendedFood)
  // .map(e => e.owners.join(', '))
  .flatMap(e => e.owners);
// .join(', ');
console.log(underfedDogOwners);

//4
const strOverfedDogOwners = dogs
  .filter(e => e.curFood > e.recommendedFood)
  // .map(e => e.owners.join(' and '))
  .flatMap(e => e.owners)
  .join(' and ');
const strUnderfedDogOwners = dogs
  .filter(e => e.curFood < e.recommendedFood)
  // .map(e => e.owners.join(' and '))
  .flatMap(e => e.owners)
  .join(' and ');
console.log(`${strOverfedDogOwners}'s dogs eat too much!`);
console.log(`${strUnderfedDogOwners}'s dogs eat too little!`);

//5
console.log(dogs.includes(e => e.curFood === e.recommendedFood));
// console.log(dogs.some(e => e.curFood === e.recommendedFood));

//6
console.log(
  dogs.some(
    e =>
      e.curFood >= e.recommendedFood * 0.9 &&
      e.curFood < e.recommendedFood * 1.1
  )
);

//7
const okayFedDogs = dogs.filter(
  e =>
    e.curFood >= e.recommendedFood * 0.9 && e.curFood < e.recommendedFood * 1.1
);
console.log(okayFedDogs);

console.log('----------------');
//8
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);

*/
