// Object property shorthand

const firstName = "Pooky";
const age = "Hounds";

const obj = { firstName, age, location: "Philadelphia" };

console.log(obj);

//Object destructuring

const film = {
  label: "Purple Fox",
  price: 19.99,
  stock: 23,
  sale: true,
  block: false,
};

const { label: title, stock, block = true } = film;

console.log(title, stock, block);

const blockbuster = (movie, { sale, block = false } = {}) =>
  console.log(`${movie} is a blockbuster? ${block} \nIs on sale? ${sale}`);

blockbuster(title, film);
