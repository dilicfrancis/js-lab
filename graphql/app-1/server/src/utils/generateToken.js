import jwt from "jsonwebtoken";

const generateToken = (userID) =>
  jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "3 days",
  });

export default generateToken;
