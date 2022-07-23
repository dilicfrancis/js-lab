const request = require("request");

const forecast = (arg, callback) => {
  const tempProps = {
    url: `http://api.weatherstack.com/current?access_key=3b0a54b63a3b64203349f1880601413c&query=${arg}&units=f`,
    json: true,
  };

  request(tempProps, (error, { body } = {}) => {
    if (error) {
      callback("unable to reach API service (on forecast.js)");
    } else if (body.error) {
      callback("bad request (on forecast.js)");
    } else {
      const data = body.current;
      const temp = data.temperature;
      const precip = data.precip;
      const feelsLike = data.feelslike;
      const desc = data.weather_descriptions[0];
      const windSpeed = data.wind_speed;
      const windDirection = data.wind_dir;
      const Humidity = data.humidity;
      callback(
        undefined,
        desc +
          ": " +
          temp +
          " degrees with a " +
          precip +
          "% chance of rain. Feels like " +
          feelsLike +
          " degrees." + "\nHumidity is " + Humidity + "%, and the local wind is blowing " + windDirection + " at " + windSpeed + "mph. Have a fine day."
      );
    }
  });
};

module.exports = forecast;
