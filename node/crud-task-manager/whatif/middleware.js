require("./db/mongoose");
const express = require("express");
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

const app = express();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method !== "POST" && req.method !== "PATCH") {
//     res.status(400).send("Invalid Operation at Middleware");
//   } else {
//     next();
//   }
// });

app.use((req, res, next) => {
  res.status(503).send("Site is currently in Maintenance");
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log("Server is up on " + port));
