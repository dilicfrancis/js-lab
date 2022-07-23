import React from "react";

const Home = () => {
  const clickHandler = () => console.log("hi");

  return (
    <div>
      <div>Home Component</div>
      <button onClick={clickHandler}>Send</button>
    </div>
  );
};

export default Home;
