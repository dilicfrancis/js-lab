const express = require("express");
const helmet = require("helmet");
const router = require("./theRouter");

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", router);

app.listen(3087);
