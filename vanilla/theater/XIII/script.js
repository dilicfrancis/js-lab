'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const showCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src=${data.flag} />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const showError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

/* Using XMLHttpRequest()

const fetchCountryAndNeighbors = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v2/name/' + country);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(JSON.parse(this.responseText));

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // display country
    showCountry(data);

    // display neighbor
    // console.log(data.borders);
    // data.borders?.forEach(c => fetchCountryAndNeighbors(c));
  });
};

fetchCountryAndNeighbors('nigeria');

*/

// const request = fetch('https://restcountries.com/v2/name/nigeria');
// console.log(request);

// const showCountryPromise = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(res => res.json())
//     .then(res => {
//       showCountry(res[0]);
//       return fetch(`https://restcountries.com/v2/name/${res[0].borders?.[0]}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Provide a valid country');
//       return res.json();
//     })
//     .then(res => showCountry(res[0], 'neighbour'))
//     .catch(err => {
//       console.error(err);
//       showError(err.message);
//     })
//     // .then(obj => console.log(obj)) //returns undefined
//     .finally(obj => {
//       console.log('All is wee that ends well, no?');
//       //   console.log(obj); // returns undefined
//       countriesContainer.style.opacity = 1;
//     });
// };

const resolve = function (url, errorMessage = 'Something went horribly wrong') {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMessage} - ${res.status}`);
    return res.json();
  });
};

const showCountryPromise = function (country) {
  resolve(
    `https://restcountries.com/v2/name/${country}`,
    'Provide a Valid Country'
  )
    .then(res => {
      showCountry(res[0]);
      return resolve(
        `https://restcountries.com/v2/name/${res[0].borders?.[0]}`,
        'This Country has No Neighbors'
      );
    })
    .then(res => showCountry(res[0], 'neighbour'))
    .catch(err => {
      console.error(err);
      showError(err.message);
    })
    // .then(obj => console.log(obj)) //returns undefined
    .finally(obj => {
      console.log('All is wee that ends well, no?');
      //   console.log(obj); // returns undefined
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = (lat, lng) => {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(res => {
      if (res.status !== 200) throw new Error("Fetch didn't go well");
      return res.json();
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .then(res => {
      console.log(`You are in ${res.city}, ${res.countryName}.`);
      return res;
    })
    .then(res => showCountryPromise(res.countryName))
    .catch(err => console.log('Something went horribly wrong, ' + err))
    .finally(() => console.log('All done here'));
};

/* ----
btn.addEventListener('click', function () {
  whereAmI(52.508, 13.381);
  // whereAmI(19.037, 72.873);
  //   whereAmI(-33.933, 18.474);
});
showCountryPromise('ireland');
-------*/

//playlet
// const wait = seconds =>
//   new Promise((resolve, reject) => {
//     setTimeout(resolve, seconds * 1000);
//   });

const wait = (seconds, func) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('time by ' + func);
      resolve();
    }, seconds * 1000);
  });

const createImage = imgPath =>
  new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', async () => {
      await wait(0, 'create');
      image.style.display = null;
      document.querySelector('.images').append(image);
      resolve(image);
    });
    image.addEventListener('error', () => {
      reject(new Error('Invalid Image Path'));
    });
  });

// window.addEventListener('load', () => {
//   let image = '';
//   createImage('img/img-1.jpg')
//     .then(img => {
//       image = img;
//       return wait(2);
//     })
//     .then(() => {
//       image.style.display = 'none';
//     })
//     // .then(() => wait(2))
//     .then(() => createImage('img/img-2.jpg'))
//     .then(img => {
//       // console.log(img);
//       image = img;
//       return wait(2);
//     })
//     .then(() => {
//       // console.log(image);
//       image.style.display = 'none';
//     })
//     .catch(err => console.error(err));
// });

const loadNPause = async () => {
  try {
    //every asynchronous (Promise) code requires an await in front of it
    let image = await createImage('img/img-1.jpg');
    // console.log(image);
    await wait(2);
    image.style.display = 'none';
    image = await createImage('img/img-2.jpg');
    await wait(2);
    image.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
  console.log('fin');
};

// window.addEventListener('load', loadNPause);
// loadNPause();

/*
document.querySelector('.container').prepend(image); //will add image as the first child of the element (before the first child of the Element)
// .insertAdjacentElement('beforebegin', image);
*/

const loadAll = async imgArr => {
  try {
    // const imgs = imgArr.map(async img => await createImage(img));
    const imgs = imgArr.map(img => createImage(img));
    console.log(imgs); //logs the reference to the Promise, not an immutable state: changes as the promise updates its state
    // console.log(await imgs[0]);
    const res = await Promise.all(imgs);
    console.log(res);
    res.forEach(e => {
      e.classList.add('parallel');
      // e.className = 'parallel';
      // console.log(e);
    });
  } catch (err) {
    console.log(err);
  }
  console.log('All set');
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
