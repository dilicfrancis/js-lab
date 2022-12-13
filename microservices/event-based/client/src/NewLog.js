import React, { useState } from "react";
import axios from "axios";

const NewLog = () => {
  const [subject, setSubject] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    await axios.post("http://logs.com/logs/new", { title: subject });
    setSubject("");
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Subject</label>
          <input
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Enter</button>
      </form>
    </div>
  );
};

export default NewLog;
