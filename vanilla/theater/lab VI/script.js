'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const player = player => document.querySelector(`.player--${player}`);
const currentPlayer = activePlayer =>
  document.getElementById(`current--${activePlayer}`);
const currentPlayerScore = activePlayer =>
  document.getElementById(`score--${activePlayer}`);

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [];
let currentScore = 0;
let activePlayer = 0;
let inPlay = true;

const init = function () {
  player(activePlayer).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  inPlay = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  currentPlayer(activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // console.log('reset:' + activePlayer);
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (inPlay) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      currentPlayer(activePlayer).textContent = currentScore;
      // console.log('gameplay:' + activePlayer);
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (inPlay) {
    scores[activePlayer] += currentScore;
    currentPlayer(activePlayer).textContent = 0;
    // console.log(scores[activePlayer]);
    currentPlayerScore(activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      inPlay = false;
      diceEl.classList.add('hidden');
      // console.log(player(activePlayer));
      // console.log(activePlayer);
      player(activePlayer).classList.add('player--winner');
      player(activePlayer).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;

//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   diceEl.classList.add('hidden');

//   for (let i = 0; i < scores.length; i++) scores[i] = 0;

//   player(activePlayer).classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');

//   currentScore = 0;
//   activePlayer = 0;
//   inPlay = true;
// });
