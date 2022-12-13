//import React, { useState, useEffect } from "react";
//import axios from "axios";
import React from "react";

const CommentList = ({ comments }) => {
  // const [comments, setComment] = useState([]);

  // async function getComments() {
  //   const res = await axios.get(
  //     `http://localhost:3002/posts/${logID}/comments`
  //   );
  //   setComment(res.data);
  // }

  // useEffect(() => {
  //   getComments();
  // }, []);

  const renderComments = comments.map((comment) => {
    let content;

    if (comment.status === "pending") {
      content = "Comment is being moderated...";
    }

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "rejected") {
      content = "Comment was not approved.";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
