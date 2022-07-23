const clients = [];

//adds user

const addClient = ({ id, username, room }) => {
  //data cleanup
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate data
  if (!username || !room) {
    return {
      error: "username and room are required",
    };
  }

  //check for already taken username
  const takenUsername = clients.find(
    (client) => client.room === room && client.username === username
  );
  if (takenUsername) {
    return {
      error: "this username is already taken for this room",
    };
  }

  //save instance
  const client = { id, username, room };
  clients.push(client);
  return { client };
};

//Fetch a client

const fetchClient = (id) => clients.find((client) => client.id === id);

//Fetch all clients in a room

const fetchRoom = (room) =>
  (gathering = clients.filter(
    (client) => client.room === room.trim().toLowerCase()
  ));

//remove a client
const removeClient = (id) => {
  const index = clients.findIndex((client) => client.id === id);

  if (index != -1) {
    return clients.splice(index, 1)[0];
  }
};

module.exports = {
  addClient,
  fetchClient,
  fetchRoom,
  removeClient,
};

//module tests
//addClient({ id: 343, username: "luke", room: "sinker" });
//addClient({ id: 33, username: "lucy", room: "sinker" });
//addClient({ id: 43, username: "lulu", room: "sinker" });
//console.log(clients);
//console.log(removeClient(33));
//console.log(clients);
//console.log(addClient({ id: 343, username: "dd", room: "" }));
//console.log(fetchClient(43));
//console.log(fetchRoom("    sInker"));
