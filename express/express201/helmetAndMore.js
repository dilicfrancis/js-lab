const exp = require("constants");
const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet()); //security protection
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/ajax", (req, res) => {
  console.log(req);
  res.json("test", 3, 4, 6);
});
app.get("/", (req, res) => {
  res.send({ ty: "test" });
});

app.listen(3000);
