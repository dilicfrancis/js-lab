const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Lee Lom",
  email: "rdy17@asmm5.com",
  password: "strong_phrase;",
  tokens: [{ token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT) }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Chikito Lincoln",
  email: "baaah@rimmy.ho",
  password: "hariem56%gkd",
  tokens: [{ token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT) }],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: false,
  userID: userOne._id,
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second test task",
  completed: true,
  userID: userOne._id,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third test task",
  completed: false,
  userID: userTwo._id,
};

const initiateDb = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  initiateDb,
};
