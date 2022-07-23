require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

const main = async () => {
  const task = await Task.findById("61145b32a0f25f338081b02b");
  await task.populate("userID").execPopulate();
  console.log(task.userID);

  const user = await User.findById("611458fb3ac0b848b4cc00d2");
  await user.populate("userTasks").execPopulate();
  console.log(user.userTasks);
};

main();
