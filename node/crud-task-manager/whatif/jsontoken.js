const jwt = require("jsonwebtoken");

const jwtFunction = async () => {
  const token = jwt.sign({ _id: "fug79r9h" }, "random signature", {
    expiresIn: "0 seconds",
  });
  console.log(token);

  const vToken = jwt.verify(token, "random signature");

  console.log(vToken);
};

jwtFunction();
