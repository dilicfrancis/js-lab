const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { gist, pin } = require("./utils/contents");
const {
  addClient,
  fetchClient,
  fetchRoom,
  removeClient,
} = require("./utils/clients");

//constant variable paths
const publicDir = path.join(__dirname, "../public");
const port = process.env.PORT;

//initialization
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//express config

//setting up static directory: this directory is searched first for matches before route
app.use(express.static(publicDir));

//count test
// let count = 0;

//print a message to the terminal when a client connects
//io.on("",()=>{}) also runs ForEach loop per item
io.on("connection", (socket) => {
  console.log("new web socket connection");

  socket.on("start", (query, acknowledge) => {
    const { error, client } = addClient({ id: socket.id, ...query });

    if (error) {
      return acknowledge(error);
    }

    socket.join(client.room); //rooms are enrolled here. All .to() calls must refer to a room that has been enrolled here.
    socket.emit("message", gist("Admin", "Welcome!"));
    socket.broadcast
      .to(client.room)
      .emit("message", gist("Admin", `${client.username} has joined`));
    io.to(client.room).emit("participants", {
      room: client.room,
      present: fetchRoom(client.room),
    });
    acknowledge();
  });

  socket.on("sendBroadcast", (broadcast, acknowledge) => {
    const client = fetchClient(socket.id);
    const filter = new Filter();

    if (filter.isProfane(broadcast)) {
      return acknowledge("profanity is not allowed");
    }

    io.to(client.room).emit("message", gist(client.username, broadcast));
    acknowledge();
  });
  socket.on("sendLocation", (location, acknowledge) => {
    const client = fetchClient(socket.id);
    socket.broadcast
      .to(client.room)
      .emit("locationMessage", pin(client.username, location));
    acknowledge("location was shared");
  });

  socket.on("disconnect", () => {
    const client = removeClient(socket.id);

    if (client) {
      io.to(client.room).emit(
        "message",
        gist("Admin", `${client.username} has left`)
      );
      io.to(client.room).emit("participants", {
        room: client.room,
        present: fetchRoom(client.room),
      });
    }
  });

  // socket.on("add", () => {
  //   count++;
  //   //socket.emit("countChanged", count);
  //   io.emit("countChanged", count);
  // });
});

//routes
app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

//listening port
server.listen(port, () => console.log(`Listening on ${port}...`));
