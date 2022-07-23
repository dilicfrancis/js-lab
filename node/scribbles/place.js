const fs = require("fs");

const buffer = fs.readFileSync("place.json").toString();
let fileContent = JSON.parse(buffer);
fileContent.name = "Pooky";
fileContent.age = "32";
fs.writeFileSync("place.json", JSON.stringify(fileContent));
console.log(fileContent);
