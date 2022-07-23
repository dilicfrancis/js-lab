const express = require("express");
const app = express();

function validateUser(req, res, next) {
  //do some validation
  res.locals.validated = true;
  console.log("validated successful!");
  next();
}

//app.use is a more generic request form that doesn't specify a REST method. It also does not require a url in its first argument - will run on all paths when no url is specified.
//app.all is another generic that refers to all requests no mater their REST method.
app.use(validateUser); //applies to all routes
app.use("/one-route", validateUser); //applies to only one route

app.get("/", (req, res, next) => {
  res.send("Hi");
  console.log(res.locals.validated); //we still have access to this property set in the middleware
});

//app.use, app.all, app.[method] all use the same middleware format (req, res, next) => {}, and as such can be thought as all middleware.

app.get("/one-route", (req, res, next) => {
  res.send("Hi too");
});

app.all("*", (req, res) => {
  validateUser(req, res); //can also run inside a single route, but has to be repeated for each route where required.
  res.send("tsk!");
});

app.listen(3000);
