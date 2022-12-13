const Emitter = require("events");
const { EventEmitter } = require("stream");
//const util = require("util");

class Salute extends Emitter {
  constructor() {
    super();
    this.salutation = "Oi!";
  }

  display(data) {
    console.log(this.salutation + ": " + data);
    this.emit("salute", data);
  }
}

// function Salute() {
//   // borrows the properties from EventEmitter obj
//   EventEmitter.call(this);
//   this.salutation = "Oi!";
// }

// util.inherits(Salute, Emitter); //does not run Salute contructor, just links the .prototype of both functions.

// Salute.prototype.display = function (data) {
//   console.log(this.salutation + ": " + data);
//   this.emit("salute", data);
// };

const speaker = new Salute();
speaker.on("salute", (data) => console.log("..a salute occurred - " + data));

speaker.display("Pooky");

// const Emitter = require("events");
// // var Emitter = require("./emitter");

// const emitter = new Emitter();

// emitter.on("happened", () => console.log("...event has happened."));

// emitter.emit("happened");

// const welcome = require("./welcome.js");
//import { welcome } from "./welcome.js";

// welcome();

// console.log("Hi");

// let a = "ko";

// let f = a;

// let h = f;
