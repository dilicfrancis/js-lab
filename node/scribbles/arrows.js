const multiplyRegular = function (a) {
  return a * a;
};

const multiplyArrow = (a) => {
  return a * a;
};

const multiplyArrowShot = (a) => a * a;

console.log(multiplyArrowShot(45));

const concert = {
  artist: "Amy Lee",
  band: ["Eva", "Chopper", "Rookie"],
  location() {
    console.log("Join " + this.artist + " SF");
    this.band.forEach((b) =>
      console.log(b + " will be there with " + this.artist)
    );
  },
};

concert.location();
