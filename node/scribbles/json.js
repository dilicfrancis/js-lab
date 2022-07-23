const fs = require("fs");
const book = {
  title: "Diplomacy",
  author: "Henry Kissinger",
};

const bkJSN = JSON.stringify(book);
fs.writeFileSync("bookJSON.json", bkJSN);
const buffer = fs.readFileSync("bookJSON.json");
const data = buffer.toString();
data ? console.log("success") : console.log("something went wrong");

const dataObj = JSON.parse(data);
console.log(dataObj.title + " was added to your library.");

// const bkJSN = JSON.stringify(book);
// console.log(bkJSN);

// const bkNJ = JSON.parse(bkJSN);
// console.log(bkNJ.author);
