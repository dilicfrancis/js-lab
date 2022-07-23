const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//get value
let entry = process.argv[2];

if (!entry) {
  return console.log("Provide a location: 'node app [location]'");
}

geocode(entry, (err, { latitude, longitude, location } = {}) => {
  let longLat;
  if (!err) {
    longLat = latitude + "," + longitude;
  } else {
    console.log(err);
    longLat = 0;
  }
  forecast(longLat, (error, response) => {
    if (error) {
      return console.log(error);
    } else {
      console.log(`Weather Forecast For ${location}\n${response}`);
    }
  });
});
