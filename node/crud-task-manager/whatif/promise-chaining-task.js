require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndRemove("6108a3a50ab4ec055ca9d881")
//   .then(() => Task.countDocuments({ completed: false }))
//   .then((count) => console.log(count))
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndRemove(id);
  return await Task.countDocuments({ completed: false });
};

deleteTaskAndCount("610845edf8e64334cc63113e")
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
