var express = require("express");
const request = require("request");
var router = express.Router();
const passport = require("passport");

//const apiKey = "";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.user);
  request.get(nowPlayingUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    //res.json(parsedData);
    res.render("index", { mainData: parsedData.results });
  });
});

router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/film/:id", (req, res) => {
  const filmId = req.params.id;
  const filmUrl = `${apiBaseUrl}/movie/${filmId}?api_key=${apiKey}`;
  request.get(filmUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.render("single-movie", { filmData: parsedData });
  });
});

router.post("/search", (req, res) => {
  const searchTerm = encodeURI(req.body.movieSearch);
  const category = req.body.cat;
  const searchUrl = `${apiBaseUrl}/search/${category}/?api_key=${apiKey}&query=${searchTerm}`;
  request.get(searchUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    //res.json(parsedData);
    if (category === "person") {
      const results = parsedData.results[0].known_for;
      res.render("index", { mainData: results });
      return;
    }
    res.render("index", { mainData: parsedData.results });
  });
});

module.exports = router;
