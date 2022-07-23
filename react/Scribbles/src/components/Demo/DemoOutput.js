import React from "react";
const DemoOut = (props) => {
  console.log("me too!");
  return (
    <>
      <p>Try this</p>
      <p>{props.show ? "This is new" : ""}</p>
    </>
  );
};

export default React.memo(DemoOut);
