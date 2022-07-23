const { Router } = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    //const newTask = new Task(req.body);
    const newTask = new Task({ ...req.body, userID: req.user._id });
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send("Error!\n" + e);
  }
  // newTask
  //   .save()
  //   .then((resolve) => res.status(201).send("Success!\n" + resolve))
  //   .catch((err) => res.status(400).send("Error!\n" + err));
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const qCompleted = req.query.completed;
    const qLimit = req.query.limit;
    const qSkip = req.query.skip;
    const qSortBy = req.query.sortBy;
    const match = {};
    const sort = {};

    if (qCompleted === "true") {
      match.completed = true;
    } else if (qCompleted === "false") {
      match.completed = false;
    }

    if (qSortBy) {
      const sortModule = qSortBy.split("`"); //splits into an array of both paths
      sort[sortModule[0]] =
        sortModule[1] === "asc" ? 1 : sortModule[1] === "desc" ? -1 : 0;
    }

    await req.user
      .populate({
        path: "userTasks",
        match,
        options: {
          limit: parseInt(qLimit),
          skip: parseInt(qSkip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.userTasks);

    // const allTasks = await Task.find({ userID: req.user._id });
    // res.send(allTasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
  // Task.find({})
  //   .then((resolve) => res.send(resolve))
  //   .catch((err) => res.status(500).send())
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    // const foundTask = await Task.findById(_id);
    const foundTask = await Task.findOne({ _id, userID: req.user._id });

    if (!foundTask) {
      return res.status(404).send("No match found");
    }
    res.send(foundTask);
  } catch (e) {
    //console.log(e);
    res.status(500).send();
  }
  //     .then((resolve) => {
  //       if (!resolve) {
  //         return res.status(404).send("No match found");
  //       }
  //       res.send(resolve);
  //     })
  //     .catch((err) => res.status(500).send());
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    //check whether update keys are valid
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).send("Invalid Update Operation");
    }

    const _id = req.params.id;
    const userID = req.user._id;
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, userID });
    if (!task) {
      return res.status(404).send("No match found");
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const userID = req.user._id;

    const task = await Task.findOneAndDelete({ _id, userID });
    if (!task) {
      return res.status(404).send("No match found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
