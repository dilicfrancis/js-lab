'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(e => e.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
//DOM Traversing
const h1Traverse = document.querySelector('h1');

//Downwards to child
console.log(h1Traverse.querySelectorAll('.highlight')); //returned all matching selectors with the element of the query
console.log(h1Traverse.childNodes); //returns all child nodes under the element queried including text, comments, and all other node types
console.log(h1Traverse.children); //returns only html element node types that are child to the queried element. Also a live collection i.e. automatically updated when DOM changes in realtime
h1Traverse.firstElementChild.style.color = 'white'; //allows access to retrieve or set only the first child of the queried element
h1Traverse.lastElementChild.style.color = 'orangered'; //allows access to retrieve or set only the last child of the queried element

//Upwards to parent
console.log(h1Traverse.parentNode); //returns all nodes at the parent level to the queried element
console.log(h1Traverse.parentElement); //returns only the parent html element node of the queried element
//element.closet() - similar to query selector but queries upward not downward
h1Traverse.closest('.header').style.background = 'var(--gradient-secondary)'; //returns and sets the closet parent selector from the element queried
h1Traverse.closest('h1').style.background = 'var(--gradient-primary)'; //same as previous comment. Element queried can also be the closest selector

//Sideways to sibling elements
console.log(h1Traverse.previousSibling); //returns the previous sibling node (of any type) to the element queried
console.log(h1Traverse.nextSibling); //returns the next sibling node (of any type) to the element queried
console.log(h1Traverse.previousElementSibling); //returns the previous sibling html element to the element queried
console.log(h1Traverse.nextElementSibling); //returns the next sibling html element tot the element queried

console.log(h1Traverse.parentElement.childNodes); //returns all sibling nodes (of any type) by traversing up then down the DOM from the queried element - including itself
console.log(h1Traverse.parentElement.children); //returns an html collection of only sibling html elements by traversing up then down the DOM from the queried element - including itself
//e.g
console.log([...h1Traverse.parentElement.children]);

[...h1Traverse.parentElement.children].forEach(el => {
  if (el !== h1Traverse) el.style.transform = 'scale(0.5)';
});
*/

//Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clickTarget = e.target.closest('.operations__tab');
  // console.log(clickTarget);

  //Guard clause
  if (!clickTarget) return;

  //remove active tab and content
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );

  //Active tab
  clickTarget.classList.add('operations__tab--active');

  //Content
  document
    .querySelector(`.operations__content--${clickTarget.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fad
const nav = document.querySelector('.nav');

const hoverHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   hoverHandler(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   hoverHandler(e, 1);
// });

nav.addEventListener('mouseover', hoverHandler.bind(0.5));
nav.addEventListener('mouseout', hoverHandler.bind(1));

/*
console.log(document); // selects the entire document object including meta data
console.log(document.documentElement); //selects only the html s of the  document
console.log(document.head); //selects just the head section
console.log(document.body); //selects just the body section
//these document methods lets you select only a specific element of an html structure
//Returns a NodeList meaning the elements returned are an array-like structure that matched what is in the html file
document.querySelector(); //returns only the first match of the entered class ".className" or html element "div"
document.querySelectorAll(); //returns all matches of the entered class or html tag

// Returns and HTMLCollection or LIVE COLLECTION meaning that any changes to the rendered page is automatically updated to the returned collection
document.getElementById(); //returns the element with the matching id
document.getElementsByTagName(); //returns all the elements that match the tag name e.g. "button"
document.getElementsByClassName(); //returns all the elements that match the class name e.g "className"

document.createElement(); //creates a new DOM elements */
/*
//e.g.
const cookie = document.createElement('div');
cookie.classList.add('cookie-message');
// cookie.textContent = 'We use cookies for improved functionality and analytics.';
cookie.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// document.querySelector('.header').prepend(cookie);
document.querySelector('.header').append(cookie);
// document.querySelector('.header').append(cookie.cloneNode(true));
console.log(cookie.textContent);

// document.querySelector('.header').before(cookie);
// document.querySelector('.header').after(cookie);

//delete an element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookie.remove());
// cookie.parentElement.removeChild(cookie)

//Inline Styles
cookie.style.backgroundColor = '#37383d';
cookie.style.width = '120%';

//To set
// element.style.setProperty("property", "value")

console.log(cookie.style.height); //nothing - unset
console.log(cookie.style.width); //120%. element.style only works on inline styles. Won't retrieve properties set inside a stylesheet file.
//alternative
console.log(getComputedStyle(cookie).height);

cookie.style.height =
  Number.parseFloat(getComputedStyle(cookie).height, 10) + 23 + 'px';

console.log(cookie.style.height);
//use the setProperty method to change custom properties in stylesheets
document.documentElement.style.setProperty('--color-primary', '#3a3a3a');

//Attributes
console.log(document.querySelector('.nav__logo').alt); //only standard properties are defined
//for custom defined attributes use the getAttribute() method and pass the attribute as the parameter
console.log(document.querySelector('.nav__logo').getAttribute('designer'));
console.log(document.querySelector('.nav__logo').className); //className instead of class
console.log(document.querySelector('.nav__logo').src); //returns absolute path from the browser, and not from the path in the html
//for the path stored in html file, use the getAttribute() method
console.log(document.querySelector('.nav__logo').getAttribute('src'));

//Attributes can also be set programmatically
document.querySelector('.nav__logo').alt = 'custom text';
document.querySelector('.nav__logo').setAttribute('designer', 'CustomAttr');
document.querySelector('.nav__logo').setAttribute('data-info', 'graphics');
document
  .querySelector('.nav__logo')
  .setAttribute('data-more-info', 'secondary graphics');
//override all classes listed with one assignment
document.querySelector('.nav__logo').className = 'thisClass';

//Data Attribute: for attributes that start with the word 'data-[name]'.
//This will be stored document.querySelector('.nav__logo').dataset.[name]
console.log(document.querySelector('.nav__logo').dataset.info);
//use carmel notation for compound entries. e.g
console.log(document.querySelector('.nav__logo').dataset.moreInfo);


//popular Class methods. Separate multiple parameters with commas.
document.querySelector('.nav__logo').classList.add()
document.querySelector('.nav__logo').classList.remove()
document.querySelector('.nav__logo').classList.toggle()
document.querySelector('.nav__logo').classList.contains()
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log(
    'Current scroll on X and Y',
    window.pageXOffset,
    window.pageYOffset
  );

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, //excludes scrollbars
    document.documentElement.clientWidth //excludes scrollbars
  );

  //scroll to position
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //old approach
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new approach
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
const alertH1 = e => alert('Listener says great!');

h1.addEventListener('mouseover', alertH1);
setTimeout(() => h1.removeEventListener('mouseover', alertH1), 5300);

//old school
// h1.onmouseover = e => alert('Old school over');

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log(this);
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true //capturing
);

/*
//sticky - old way
const initCoord = section1.getBoundingClientRect();
// console.log(initCoord);
window.addEventListener('scroll', function () {
  // console.log(window.scrollY);
  if (window.scrollY > initCoord.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

/*
//Intersection Observer
const obsCallback = function (entries, observer) {
  entries.forEach((entry)=>console.log(entry))
} 
const obsOptions = {
  root: null,
  threshold: [0, 0.2]
}
const observer = new IntersectionObserver(obsCallback, obsOptions)
observer.observe(section1)
*/

//Sticky with Intersection Observer
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(
  entries => {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
    // rootMargin: '-90px',
  }
);
headerObserver.observe(header);

//Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//lazy load images
const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    // entry.target.classList.remove('lazy-img');
    entry.target.addEventListener('load', function (e) {
      e.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '150px',
  }
);
imgTargets.forEach(el => imgObserver.observe(el));

//Slider
const sliderComp = () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  const slideMax = slides.length - 1;
  let activeSlide = 0;

  //set slide
  const setSlide = active =>
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - active)}%)`)
    );

  //Dot nav
  const dotsNav = () =>
    slides.forEach((_, index) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      )
    );

  //active dot i.e. slide
  const activeDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //next slide
  function nextSlide() {
    if (activeSlide === slideMax) activeSlide = 0;
    else activeSlide++;
    setSlide(activeSlide);
    activeDot(activeSlide);
  }

  //Previous slide
  function prevSlide() {
    if (activeSlide === 0) activeSlide = slideMax;
    else activeSlide--;
    setSlide(activeSlide);
    activeDot(activeSlide);
  }

  // slider.style.transform = 'scale(0.3) translateX (-760px)';
  // slider.style.overflow = 'visible';

  // slides.forEach(
  //   (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
  //   //set the transform property in 0%, 100%, 200%, 300% increments
  // );

  //initialize slide
  setSlide(activeSlide);

  //initialize dots nav
  dotsNav();
  activeDot(activeSlide);

  //Slide Buttons
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Slide Keypress
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  //Dots
  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      setSlide(slide);
      activeDot(slide);
    }
  });
};

sliderComp(); //can also be created with an IIF and parameters can be added to function to further customize the slider.

//DOM Life Cycle
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);

  e.returnValue = '';
});
