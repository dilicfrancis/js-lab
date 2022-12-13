const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/logs", (req, res) => res.send(posts));
app.post("/logs/new", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await axios
    .post("http://events-srv:3008/events", {
      type: "LogCreated",
      data: { id, title },
    })
    .catch((err) => console.log(err.message));
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.send({});
});

app.listen(3001, () => console.log("listening on 3001"));
