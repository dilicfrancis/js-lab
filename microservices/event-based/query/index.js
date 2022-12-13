const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
  if (type === "LogCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    //comment = { ...data };
    comment.status = status;
    comment.content = content;
  }
};

app.get("/logs", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  // console.log(posts);
  res.send({});
});

app.listen(3003, async () => {
  console.log("listening on 3003!");

  const res = await axios
    .get("http://events-srv:3008/events")
    .catch((err) => console.log(err.message));

  for (let event of res.data) {
    console.log("Processing event:", event.type);

    eventHandler(event.type, event.data);
  }
});
