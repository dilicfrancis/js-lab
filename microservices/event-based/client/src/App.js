import React from "react";
import LogList from "./LogList";
import NewLog from "./NewLog";

const App = () => {
  return (
    <div className="container">
      <h1>::New Log::</h1>
      <NewLog />
      <hr />
      <h1>Logs</h1>
      <LogList />
    </div>
  );
};

export default App;
