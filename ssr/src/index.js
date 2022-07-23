//common JS module syntax
////const express = require("express");
////const React = require("react");
////const renderToString = require("react-dom/server").renderToString;
////const Home = require("./client/components/Home").default;

//ES6 import syntax - not natively supported in Node without webpack
import express from "express";
import createStore from "./helpers/createStore";
import renderer from "./helpers/renderer";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore();
  res.send(renderer(req.path, store));
});

app.listen(3000, () => console.log("Listening on 3000!"));
