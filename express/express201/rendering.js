const path = require("path");
const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(helmet());
//serve up static files
app.use(express.static("public"));
//parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", [
  path.join(__dirname, "template"),
  path.join(__dirname, "new"),
  path.join(__dirname, "views"),
]);

app.get("/", (req, res, next) =>
  res.render("index", {
    //this is appended to res.locals
    message: "hello",
    another: "well",
  })
);

app.listen(3000, () => console.log("Listening on 3000!"));
