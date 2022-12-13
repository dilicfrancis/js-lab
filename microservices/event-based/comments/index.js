const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/logs/:id/comments", (req, res) =>
  res.status(200).send(commentsByPostId[req.params.id] || [])
);
app.post("/logs/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  //check if post id already exists
  const comment = commentsByPostId[req.params.id] || [];
  comment.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comment;
  await axios.post("http://events-srv:3008/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });
  res.status(201).send(comment);
});

app.post("/events", async (req, res) => {
  console.log(req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://events-srv:3008/events", {
      type: "CommentUpdated",
      data: { ...data },
    });
  }

  res.send({});
});

app.listen(3002, () => console.log("listening on 3002"));
