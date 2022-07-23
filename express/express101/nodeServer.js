const http = require("http");
const fs = require("fs");

//using the createServer method

const server = http.createServer((req, res) => {
  //console.log(req);
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homeFile = fs.readFileSync("node.html");
    res.write(homeFile);
    res.end();
    return;
  }
  res.writeHead(404, { "content-type": "text/html" });
  res.write(":(");
  res.end();
});

server.listen(3000);
