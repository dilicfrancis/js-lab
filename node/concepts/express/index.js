const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const port = process.env.PORT || 3031;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

app.set("view engine", "ejs");

app.use("/assets", express.static(`${__dirname}/public`));

app.use("/", (req, res, next) => {
  console.log(`You are here: ${req.url}`);
  next();
});

app.get("/", (req, res) => res.render("index"));

app.get("/entity/:id", (req, res) => res.render("entity", { req }));

app.post("/entity", urlencodedParser, (req, res) => console.log(req.body));

app.post("/json", jsonParser, (req, res) => console.log(req.body));

app.get("/api", (req, res) =>
  res.json({ firstName: "Jolly", lastName: "Kolpoli" })
);

app.listen(port);
