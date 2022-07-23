const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../whatif/tests");

//Pass and Error
// test("Hey Jest", () => {});

// test("error test", () => {
//   throw new Error("error!");
// });

test("Calculate total with tip", () => {
  const total = calculateTip(34, 0.7);
  const expectedResult = 34 + 34 * 0.7;
  expect(total).toBe(expectedResult);

  // if (total !== expectedResult) {
  //   throw new Error(
  //     "Output Error: Result should be " + expectedResult + ". Got " + total
  //   );
  // }
});

test("Calculate total with default tip", () => {
  const total = calculateTip(34);
  const expectedResult = 34 + 34 * 0.3;
  expect(total).toBe(expectedResult);
});

test("Should convert 32 F to 0 C", () => {
  const tempC = fahrenheitToCelsius(62);
  const expectedResult = (62 - 32) / 1.8;
  expect(tempC).toBe(expectedResult);
});
test("Should convert 0 C to 32 F", () => {
  const tempF = celsiusToFahrenheit(16);
  const expectedResult = 16 * 1.8 + 32;
  expect(tempF).toBe(expectedResult);
});

// test("Async test demo", (next) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     next();
//   }, 2000);
// });

test("Should add 2 numbers", (next) => {
  add(4, 9).then((result) => expect(result).toBe(13));
  next();
});

test("Adds two numbers with async/await", async () => {
  const result = await add(6, 3);
  expect(result).toBe(9);
});
