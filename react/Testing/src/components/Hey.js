import { useState } from "react";
import Output from "./Output";

const Hey = () => {
  const [text, setText] = useState("Hey there!");

  const textHandler = () => {
    if (text === "Hey there!") {
      setText(() => "How are you?");
    } else setText(() => "Hey there!");
  };

  return (
    <div>
      <h2 onClick={textHandler}>{text}</h2>
      <Output>That was quite the greeting, wasn't it?</Output>
    </div>
  );
};

export default Hey;
