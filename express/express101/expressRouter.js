//const express = require("express")();
const express = require("express");
const app = express();

app.get("/", (req, res) => console.log(req.route));
app.post("/", (req, res) => console.log(req.route));
app.put("/", (req, res) => console.log(req.route));
app.delete("/", (req, res) => console.log(req.route));

app.listen(3000, () => console.log("Listening on 3000!"));
