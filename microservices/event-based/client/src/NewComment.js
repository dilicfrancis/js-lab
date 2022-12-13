import React, { useState } from "react";
import axios from "axios";

const NewComment = ({ logID }) => {
  const [comment, setComment] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    await axios.post(`http://logs.com/logs/${logID}/comments`, {
      content: comment,
    });

    setComment("");
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default NewComment;
