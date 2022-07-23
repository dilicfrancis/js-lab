const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//setting paths to constant variables
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views/templates");
const partialsPath = path.join(__dirname, "../views/partials");

//executing express
const app = express();
const port = process.env.PORT || 3000;

//setting up configurations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setting up static directory
app.use(express.static(publicDir));

//serving pages
app.get("", (req, res) => {
  res.render("index", {
    title: "Today",
    forecast: "sunny",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About ",
    forecast: "rainy",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help ",
    forecast: "windy",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address was provided.",
    });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    let longLat;
    if (!err) {
      longLat = latitude + "," + longitude;
    } else {
      console.log(err);
      longLat = 0;
    }
    forecast(longLat, (error, response) => {
      if (error) {
        console.log(error);
        res.send({
          error: "unable to complete requests at this time",
          message: "provide a valid address or try again later",
        });
      } else {
        res.send({ location, forecast: response });
      }
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "no query provided",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Error: Not Found ",
    forecast: "cloudy",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Page Error",
    forecast: "snowy",
  });
});

//assigning listening port
app.listen(port, () => console.log(`Listening on ${port}...`));
