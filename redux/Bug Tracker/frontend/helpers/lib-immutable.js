import { Map } from "immutable";

let book = Map({ title: "On China" });

function publish(aBook) {
  return aBook.set("isPublished", true);
}

const newBook = publish(book);

console.log(newBook.toJS());
