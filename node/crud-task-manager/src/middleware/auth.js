const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const twig = jwt.verify(token, process.env.JWT); // this returns the userID
    const user = await User.findOne({ _id: twig._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ Error: "Not Logged In" });
  }
};

module.exports = auth;
