const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // optional if template folder is name view and stored on the project root

app.use((req, res, next) => {
  if (req.query.msg === "nope") {
    res.locals.msg = "Invalid Login:/";
    next();
  }
  res.locals.msg = "";
  next();
});

app.get("/", (req, res) => res.send("ready!"));

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (password === "d") {
    res.cookie("username", username);
    res.redirect("/welcome");
  }
  res.redirect("/login?msg=nope");
  //res.json(req.body);
  return;
});

app.param("id", (req, res, next, id) => {
  //before sifting through link combinations,
  // run this middleware is the wildcard :id within the request
  //then
  next(); //continue to the route
});

app.get("/welcome", (req, res, next) =>
  res.render("welcome", { username: req.cookies.username || "user" })
);

app.get("/feed/:id", (req, res, next) => res.send(req.params.id));

app.get(
  "/ground/:firstlevel/:secondlevel/:third/title",
  (
    req,
    res,
    next //triggers only with this combination // params can also be anywhere in the url - middle, last, etc.
  ) =>
    res.send(
      `${req.params.firstlevel}, ${req.params.secondlevel}, ${req.params.third}`
    )
);

app.get("/render_statement", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "userStatements/BankStatementChequing.png")
  );
});

app.get("/download_statement", (req, res, next) => {
  //res.download mainly sets the html header to
  // res.set("content_disposition", "attachment")
  //and then
  //res.sendFile
  res.download(
    path.join(__dirname, "userStatements/BankStatementChequing.png"),
    "OptionalCustomFileName.png"
  );
  //also consider
  res.attachment(
    path.join(__dirname, "userStatements/BankStatementChequing.png"),
    "OptionalCustomFileName.png",
    (err) => {
      //optional callback to throw errors if any
      //This callback runs AFTER headers (response) is already sent to the client
      if (res.headersSent) {
        return console.log(err);
      }
      res.redirect("/download/error");
    }
  );
  //this only sets the header without sending the file to the client. It also sets the filename if a file is provided.
});

app.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000, () => console.log("Listening on port 3000!"));
