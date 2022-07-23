require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("61089e3e6de21e169cd216f4", { age: 0 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
//   })
//   .then((docs) => {
//     console.log(docs);
//   })
//   .catch((e) => console.log(e));

const updateAgeAndCount = async (id, age) => {
  const updateUser = await User.findByIdAndUpdate(id, { age });
  const userCount = await User.countDocuments({ age });
  return userCount;
};

updateAgeAndCount("61089e3e6de21e169cd216f4", 0)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
