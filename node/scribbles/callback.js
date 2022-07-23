// setTimeout(() => console.log("Two seconds"), 2000);

// const people = ["Pooky", "Loki", "Hounds"];
// const sNames = people.filter((name) => name <= 4);

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       longitude: 0,
//       latitude: 0,
//     };
//     callback(data); //when
//   }, 2000);
// };

// geocode("Someplace", (code) => console.log(code));

const add = (first, second, third) => {
  setTimeout(() => {
    third(first + second);
  }, 2000);
};

add(1, 4, (sum) => console.log(sum));
