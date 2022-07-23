// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log(req.originalUrl); //undefined
//   console.log(req.url); //SET BY NODE!
//   console.log(req.path); //undefined
//   console.log("Someone hit our HTTP server");
//   res.end("<h1>Go Chiefs!</h1>");
// });

// server.listen(3000);

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(req.originalUrl); //the current path according to Express
  console.log(req.url); //from node, not express
  console.log(req.path); //the current path, according to Express
  console.log(req);
  res.send("<H1>Hello World</H1>");
});

app.listen(3000);
