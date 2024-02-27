const checkPasswordPattern = (password) => {
  const theLength = /^.{8,32}$/,
    upper = /[A-Z]/,
    lower = /[a-z]/,
    numbers = /[0-9]/,
    special = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  if (
    theLength.test(password) &&
    upper.test(password) &&
    lower.test(password) &&
    numbers.test(password) &&
    special.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

console.log(checkPasswordPattern("89'}23#@8*nbHO{OS"));
console.log(checkPasswordPattern("89'}23#@8*nbHO{OS"));
