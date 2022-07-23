import { produce } from "immer";

let book = { title: "On China" };

function publish(aBook) {
  return produce(aBook, (newBook) => {
    newBook.isPublished = true;
  });
}

const newBook = publish(book);

console.log(newBook);
