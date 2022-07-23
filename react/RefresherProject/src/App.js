import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

function App() {
  const [usersList, setUsersList] = useState([]);
  const NewUserHandler = (name, age) => {
    setUsersList((prev) => {
      return [...prev, { id: Math.random().toString(), name: name, age: age }];
    });
  };
  return (
    <>
      <AddUser onNewUser={NewUserHandler} />
      <UserList users={usersList} />
    </>
  );
}

export default App;
