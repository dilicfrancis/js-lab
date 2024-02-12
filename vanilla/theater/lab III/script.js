// Remember, we're gonna use strict mode in all scripts now!
"use strict";

function printForecast(arr) {
  let forecast = [];
  for (let i = 0; i < arr.length; i++) {
    forecast.push(`...${arr[i]}°C in ${i + 1} day(s) `);
  }
  console.log(forecast.join(""));
  return;
}

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
