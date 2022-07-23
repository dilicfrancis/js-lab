const calculateTip = (total, tipPercent = 0.3) => total + total * tipPercent;
const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b > 10) {
        return reject("msg?");
      }
      resolve(a + b);
    }, 2000);
  });
};
module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
};
