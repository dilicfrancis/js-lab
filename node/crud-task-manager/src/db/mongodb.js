// Basic CRUD - Delete

// const { MongoClient, ObjectId } = require("mongodb");

// //config constants
// const dbURL = "mongodb://127.0.0.1:27017";
// const dbName = "taskManagerDB";

// MongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     console.log("something went wrong");
//     return;
//   }

//   const db = client.db(dbName);

//   db.collection("tasks")
//     .deleteOne({ Description: "complete node section" })
//     .then((result) => console.log(result.deletedCount))
//     .catch((err) => console.log("error"));

//   //   db.collection("users")
//   //     .deleteMany({ Age: 45 })
//   //     .then(() => console.log("went well"))
//   //     .catch(() => console.log("error"));
// });

// // Basic CRUD - Update

// const { MongoClient, ObjectId } = require("mongodb");

// //config constants
// const dbURL = "mongodb://127.0.0.1:27017";
// const dbName = "taskManagerDB";

// MongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     console.log("something went wrong");
//     return;
//   }

//   const db = client.db(dbName);

//   db.collection("tasks")
//     .updateMany({ Completed: false }, { $set: { Completed: true } })
//     .then(() => console.log("went well"))
//     .catch(() => console.log("not so well"));

//   //   db.collection("users")
//   //     .updateOne(
//   //       { _id: new ObjectId("6102cf4debed590344bf5718") },
//   //       {
//   //         $unset: { age: "" },
//   //       }
//   //     )
//   //     .then(() => console.log("well"))
//   //     .catch((err) => console.log(err));
// });

// Basic CRUD - Read

// const { MongoClient, ObjectId } = require("mongodb");

// //config constants
// const dbURL = "mongodb://127.0.0.1:27017";
// const dbName = "taskManagerDB";

// MongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     console.log("something went wrong");
//     return;
//   }

//   const db = client.db(dbName);

//   db.collection("users").findOne(
//     { _id: new ObjectId("61022c13a6649769e6a452ae") },
//     (error, result) => {
//       if (error) {
//         console.log("error with find");
//         return;
//       }

//       if (!result) {
//         return console.log("No match found");
//       }
//       console.log(result);
//     }
//   );
// });
//   db.collection("users")
//     .find({ firstName: "Pooky" })
//     .toArray((error, result) => {
//       if (error) {
//         console.log("error with find");
//         return;
//       }

//       if (!result) {
//         return console.log("No match found");
//       }
//       console.log(result);
//     });
// });
//   db.collection("users")
//     .find({ firstName: "Pooky" })
//     .count((error, result) => {
//       if (error) {
//         console.log("error with find");
//         return;
//       }

//       if (!result) {
//         return console.log("No match found");
//       }
//       console.log(result);
//     });
// });

//   db.collection("tasks").findOne(
//     { _id: new ObjectId("6102ded165f91ad9450c3b4f") },
//     (error, task) => {
//       if (error) {
//         return console.log("error finding task");
//       }
//       if (!task) {
//         return console.log("no match found");
//       }
//       console.log(task);
//     }
//   );

//   db.collection("tasks")
//     .find({ Completed: false })
//     .toArray((error, tasks) => {
//       if (error) {
//         return console.log("error finding records");
//       }
//       if (!tasks) {
//         return console.log("no task found");
//       }
//       console.log(tasks);
//     });
// });

// Basic CRUD - Insert

// const { MongoClient, ObjectId } = require("mongodb");

// //config constants
// const dbURL = "mongodb://127.0.0.1:27017";
// const dbName = "taskManagerDB";

// const ID = new ObjectId();
// console.log(ID.toHexString());
// // console.log(ID.getTimestamp());

// MongoClient.connect(dbURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     console.log("something went wrong");
//     return;
//   }

//   const db = client.db(dbName);

//   db.collection("users").insertOne(
//     {
//       _id: ID,
//       firstName: "Kiki",
//       lastName: "Lo",
//       Age: 95,
//     },
//     (error, result) => {
//       if (error) {
//         console.log("error inserting user");
//         return;
//       }
//       console.log(result.insertedId);
//     }
//   );

//   db.collection("users").insertMany(
//     [
//       { firstName: "Loki", age: 500 },
//       { firstName: "Cook", age: 37 },
//       { firstName: "Ricky", age: 6000 },
//     ],
//     (error, result) => {
//       if (error) {
//         console.log("error with inserts");
//         return;
//       }
//       console.log(result.insertedCount);
//     }
//   );

//   db.collection("tasks").insertMany(
//     [
//       { Description: "complete node section", Completed: false },
//       { Description: "laundry", Completed: false },
//       { Description: "move car", Completed: false },
//     ],
//     (error, result) => {
//       if (error) {
//         console.log("error making inserts");
//         return;
//       }
//       console.log(result.insertedIds);
//     }
//   );
// });
