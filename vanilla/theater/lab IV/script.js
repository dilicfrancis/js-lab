'use strict';

// console.log((document.querySelector('.message').textContent = 'anything'));
// console.log((document.querySelector('.guess').value = 421));
// console.log(document);

// console.log(Number(document.querySelector('.guess').value));

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let netScore = -1;
let highscore = 0;

// displayMessage = (selector, message) => {
//   return (document.querySelector(selector).textContent = message);
// };

document.querySelector('.score').textContent = score;
// displayMessage('.score', score);

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'Choose a number';
    // displayMessage('.message', 'Choose a number');
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'That is correct!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.guess').disabled = true;
    netScore = score;
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.score').textContent = --score;
      document.querySelector('.message').textContent =
        guess > secretNumber ? 'That is higher!' : 'That is lower!';
    } else {
      --score;
      document.querySelector('.score').textContent = 0;
      document.querySelector('body').style.backgroundColor = '#800000';
      document.querySelector('.number').textContent = '😵‍💫';
      document.querySelector('.message').textContent = 'Game Over!';
      document.querySelector('.guess').setAttribute('disabled', '');
      netScore = score;
      return;
    }
  }
  // else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.score').textContent = --score;
  //     document.querySelector('.message').textContent = 'That is lower!';
  //   } else {
  //     --score;
  //     document.querySelector('.score').textContent = 0;
  //     document.querySelector('body').style.backgroundColor = '#800000';
  //     document.querySelector('.number').textContent = '😵‍💫';
  //     document.querySelector('.message').textContent = 'Game Over!';
  //     document.querySelector('.guess').setAttribute('disabled', '');
  //     netScore = score;
  //     return;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  if (netScore !== -1 && netScore > highscore) {
    highscore = score;
  }

  netScore = -1;
  score = 20;

  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').removeAttribute('disabled');
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highscore;
});
