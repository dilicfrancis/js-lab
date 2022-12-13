const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    //res.writeHead(200, { "Content-Type": "text/html" });
    // let html = fs.readFileSync(`${__dirname}/index.html`, "utf8");
    // const template = "Hey Pooks!";
    // html = html.replace("?template?", template);
    // res.end(html);

    if (req.url === "/") {
      fs.createReadStream(`${__dirname}/index.html`, "utf8").pipe(res);
      return;
    }

    if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const data = {
        firstName: "Pooky",
        lastName: "Hounds",
      };
      res.end(JSON.stringify(data)); //serialize
      return;
    }
    res.writeHead(404);
    res.end("no resource for this endpoint");
  })
  .listen(8080, "127.0.0.1");
