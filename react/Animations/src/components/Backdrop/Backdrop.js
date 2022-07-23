import React from "react";

import "./Backdrop.css";

const backdrop = (props) => {
  const cssStyle = ["Backdrop", props.show ? "BackdropOpen" : "BackdropClose"];

  return <div className={cssStyle.join(" ")} onClick={props.closed}></div>;
};

export default backdrop;
