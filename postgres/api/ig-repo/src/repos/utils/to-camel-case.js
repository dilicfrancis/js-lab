module.exports = (rows) => {
  return rows.map((row) => {
    const replaced = {};

    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, (match) =>
        match.toUpperCase().replace("_", "")
      );
      //console.log(row[key] + "row-key");
      //console.log(replaced[camelCase] + "replace camel case");
      //assigns the values of parsed row into replaced.
      replaced[camelCase] = row[key];
    }
    return replaced;
  });
};
