import React, { useState, useEffect } from "react";
import axios from "axios";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

const LogList = () => {
  const [logs, setLogs] = useState({});

  async function getLogs() {
    const content = await axios.get("http://logs.com/logs");
    setLogs(content.data);
  }

  useEffect(() => {
    getLogs();
  }, []);

  const displayLogs = Object.values(logs).map((log) => {
    return (
      <div
        className="card"
        style={{ width: "32%", marginBottom: "20px" }}
        key={log.id}
      >
        <div className="card-body">
          <h3>{log.title}</h3>
          <CommentList comments={log.comments} />
          <NewComment logID={log.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-wrap flex-row justify-content-between">
      {displayLogs}
    </div>
  );
};

export default LogList;
