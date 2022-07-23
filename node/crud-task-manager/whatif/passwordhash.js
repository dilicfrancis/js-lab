const bcryptjs = require("bcryptjs");

const hashBrown = async () => {
  const password = "pass383";
  const hashed = await bcryptjs.hash(password, 9);
  const hashed2 = await bcryptjs.hash(password, 9);
  const hashed3 = await bcryptjs.hash(password, 9);

  const hashComp = await bcryptjs.compare(password, hashed3);
  console.log(hashComp);

  console.log(password);
  console.log(hashed);
  console.log(hashed2);
  console.log(hashed3);
};

hashBrown();
