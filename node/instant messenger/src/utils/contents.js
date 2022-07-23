const gist = (username, body) => {
  return {
    body,
    createdOn: new Date().getTime(),
    username,
  };
};
const pin = (username, location) => {
  return {
    link: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
    sharedOn: new Date().getTime(),
    username,
  };
};

module.exports = {
  gist,
  pin,
};
