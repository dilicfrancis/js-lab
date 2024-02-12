'use strict';

const portugalTax =
  (rate = 0.23) =>
  value =>
    value + value * rate;

console.log(portugalTax()(23));

/////////

function printErr() {
  console.log('Choose a number between 0 and 3');
}

function addOne(value) {
  this.answers[value]++;
}

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const response = Number(
      prompt(`${this.question}\n${`${this.options}`.replaceAll(
        ',',
        '\n'
      )}\nChoose a number between 0 and 3
    `)
    );

    if (isNaN(response)) {
      printErr();
      return;
    }

    switch (response) {
      case 0:
        addOne.call(poll, response);
        break;
      case 1:
        addOne.call(poll, response);
        break;
      case 2:
        addOne.call(poll, response);
        break;
      case 3:
        addOne.call(poll, response);
        break;
      default:
        printErr();
    }

    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type.toLowerCase() === 'array') {
      console.log(this.answers);
      return;
    } else if (type.toLowerCase() === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
      return;
    } else {
      console.log("Enter either type 'string' or type 'array'");
      return;
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const test1 = { answers: [5, 2, 3] };
const test2 = { answers: [1, 5, 3, 9, 6, 1] };

poll.displayResults.call(test1, 'string');
poll.displayResults.call(test1, 'array');
poll.displayResults.call(test1);

poll.displayResults.call(test2, 'string');
poll.displayResults.call(test2, 'array');
poll.displayResults.call(test2);

//////////

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
