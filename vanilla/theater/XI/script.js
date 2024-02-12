'use strict';

//Function Constructor

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// const customer = Person('Pooky', 1568);

const customer = new Person('Pookie', 1892);

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

console.log(customer);
console.log(Person.__proto__);
customer.calcAge();

function Student(firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
}
// Student.prototype = Person.prototype; // sets Student as a reference to the Person object instead of linking. Additions to Student.prototype will also be added to Person.prototype instead of kept separate
Student.prototype = Object.create(Person.prototype); //links but maintains separate prototype objects
Student.prototype.constructor = Student;
Student.prototype.introduction = function () {
  console.log(
    `This is ${this.firstName} born in ${this.birthYear}, and studying ${this.course}.`
  );
};

const joe = new Student('Joe', 2012, 'History');
joe.calcAge();
joe.introduction();
console.dir(joe);
console.dir(customer);

console.log(joe instanceof Student);
console.log(joe instanceof Person);
console.log(joe instanceof Object);

//Playlet

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  console.log(this.speed + 10 + 'km/h');
  return (this.speed += 10);
};
Car.prototype.brake = function () {
  console.log(this.speed - 5 + 'km/h');
  return (this.speed -= 5);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.brake();

car2.accelerate();
car2.brake();

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
EV.prototype.chargeBattery = function (level) {
  console.log(`Charging up to ${level}%`);
  this.charge = level;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} moving at ${this.speed}km/h, with ${this.charge}% battery left`
  );
};

const polestar = new EV('Polestar', 40, 80);
polestar.chargeBattery(92);
polestar.accelerate();
polestar.brake();
//

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  brake() {
    console.log(this.speed - 5 + 'km/h');
    this.speed -= 5;
    return this;
  }

  accelerate() {
    console.log(this.speed + 10 + 'km/h');
    this.speed += 10;
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    return (this.speed = speed * 1.6);
  }
}

const ford = new CarCl('Sedan', 20);
ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speed);
console.log(ford.speedUS);
ford.speedUS = 40;
console.log(ford.speed);

// console.dir(ford);

class EVCl extends CarCl {
  #charge = 0;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery = function (level) {
    console.log(`Charging up to ${level}%`);
    this.#charge = level;
    return this;
  };
  accelerate = function () {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} moving at ${this.speed}km/h, with ${
        this.#charge
      }% battery left`
    );
    return this;
  };
}

const tesla = new EVCl('Tesla', 56, 89);
tesla.chargeBattery(92);
tesla.accelerate();
tesla.brake();
tesla.accelerate().chargeBattery(27).brake();
