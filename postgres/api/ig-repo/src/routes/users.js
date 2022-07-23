const { Router } = require("express");
const UserRepo = require("../repos/user-repo");

const router = Router();

router.get("/users", async (req, res) => {
  //run query to get all users
  const users = await UserRepo.find();
  //respond with the users
  res.status(200).send(users);
});
router.get("/users/:id", async (req, res) => {
  //extract id
  const { id } = req.params;
  //find user
  const user = await UserRepo.findById(id);
  //respond with found user
  if (!user) {
    res.status(404).send("user not found!");
    //res.sendStatus(404);??
    return;
  }
  res.status(200).send(user);
});
router.post("/users", async (req, res) => {
  const { username, bio } = req.body;
  const user = await UserRepo.insert(username, bio);

  res.status(201).send(user);
});
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;

  const user = await UserRepo.update(id, username, bio);

  if (!user) {
    res.status(404).send("no user found");
    return;
  }
  res.send(user);
});
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.delete(id);

  if (!user) {
    return res.status(404).send("no user found");
  }
  res.send(user);
});

module.exports = router;
