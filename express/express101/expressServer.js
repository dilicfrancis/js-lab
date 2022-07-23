const express = require("express");

//invokes the create Application function in lib/express.js
const app = express();

app.all("*", (req, res) => res.send("Homepage"));

app.listen(3000, () => console.log("Listening on 3000!"));
