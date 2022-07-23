const http = require("http");

const url =
  "http://api.weatherstack.com/current?access_key=3b0a54b63a3b64203349f1880601413c&query=40,-75&units=f";

const request = http.request(url, (response) => {
  let content = "";
  response.on("data", (chunk) => {
    content += chunk.toString();
  });
  response.on("end", () => {
    const body = JSON.parse(content);
    console.log(body);
  });
});

request.on("error", (error) => console.log(error));

request.end();
