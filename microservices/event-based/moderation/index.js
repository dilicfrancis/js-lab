const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("purple") ? "rejected" : "approved";

    await axios
      .post("http://events-srv:3008/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status,
        },
      })
      .catch((err) => console.log(err.message));
  }

  res.send({});
});

app.listen(3004, () => console.log("Listening on 3004"));
