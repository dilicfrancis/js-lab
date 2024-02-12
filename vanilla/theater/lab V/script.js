'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

console.log(btnOpenModal);

// const toggleHidden = toggle => {
//   modal.classList[toggle]('hidden');
//   overlay.classList[toggle]('hidden');
// };

// for (let i = 0; i < btnOpenModal.length; i++)
//   btnOpenModal[i].addEventListener('click', function () {
//     toggleHidden('remove');
//   });

// btnCloseModal.addEventListener('click', function () {
//   toggleHidden('add');
// });

// overlay.addEventListener('click', function () {
//   toggleHidden('add');
// });

const addHidden = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const removeHidden = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', removeHidden);

btnCloseModal.addEventListener('click', addHidden);

overlay.addEventListener('click', addHidden);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) addHidden();
});
