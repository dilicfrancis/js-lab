const request = require("request");

const geocode = (address, callback) => {
  const geoProps = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoicG9va3lob3VuZHMiLCJhIjoiY2tyYnBodGZ6NHY2azJ2cWhpMDFuMnptZSJ9.a2UkYdBhq5FUgl1ZlpR7yg&limit=1`,
    json: true,
  };

  request(geoProps, (error, { body } = {}) => {
    let err;
    if (error) {
      err = "unable to connect with API service (on geocode.js)";
      callback(err, undefined);
    } else if (body.message || body.features.length === 0) {
      err = "invalid request (on geocode.js)";
      callback(err, undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
