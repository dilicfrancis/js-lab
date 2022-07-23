const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("provide a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("provide a more secure password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    profile_pic: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

//Virtual property isn't actual data. It is the relationship between two entities.
userSchema.virtual("userTasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "userID",
});

//userSchema.statics are methods on the User Model
//Authenticate Users
userSchema.statics.findByAuth = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Login");
  }
  const verify = await bcrypt.compare(password, user.password);
  if (!verify) {
    throw new Error("Invalid Login");
  }
  return user;
};

//userSchema.methods are methods on the user instance
//Generate a token

userSchema.methods.setToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userData = user.toObject();

  delete userData.password;
  delete userData.tokens;
  delete userData.__v;
  delete userData._id;
  delete userData.profile_pic;

  return userData;
};

// userSchema.methods.publicProfile = function () {
//   const user = this;
//   const userData = user.toObject();

//   delete userData.password;
//   delete userData.tokens;

//   return userData;
// };

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 9);
  }

  next();
});

//Delete user tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ userID: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
