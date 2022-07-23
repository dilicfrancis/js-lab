const express = require("express");

const app = express();

//considered in order of declaration
app.use(express.static("public"));
app.use(express.static("another"));
app.use(express.static("asmanyasyoulike"));

//app.all // whether get, post put, delete, anything!
//res.sendFile(path) // renders the file in browser

app.listen(3000, () => console.log("Listening on 3000!"));
