const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post("http://logs-srv:3001/events", event)
    .catch((err) => console.log(err.message));
  axios
    .post("http://comments-srv:3002/events", event)
    .catch((err) => console.log(err.message));
  axios
    .post("http://query-srv:3003/events", event)
    .catch((err) => console.log(err.message));
  axios
    .post("http://moderation-srv:3004/events", event)
    .catch((err) => console.log(err.message));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => res.send(events));

app.listen(3008, console.log("Listening on 3008!"));
