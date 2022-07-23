import React, { useCallback, useState } from "react";

import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";
import "./App.css";

function App() {
  const [state, setState] = useState(false);
  console.log("App running!");
  const ActivateHandler = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={state} />
      {/*state && <p>This is new!!</p>*/}
      <Button onClick={ActivateHandler}>Activate!</Button>
    </div>
  );
}

export default App;
