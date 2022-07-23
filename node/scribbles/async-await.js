const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b > 10) {
        return reject("msg?");
      }
      resolve(a * b);
    }, 2000);
  });
};

const newFunction = async () => {
  //   throw new Error("Errr!");
  //   return "A name";
  const sum = await add(34, 8);
  const sumA = await add(34, 8);
  const sumB = await add(34, 8);
  return sumB;
};

// console.log(newFunction());

newFunction()
  .then((resolve) => console.log(resolve))
  .catch((e) => console.log(e));
