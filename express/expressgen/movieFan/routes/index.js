var express = require("express");
const request = require("request");
var router = express.Router();

//const apiKey = "";
//const apiKey = "";
//const apiBaseUrl = "";
const apiBaseUrl = "http://localhost:";
//const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const nowPlayingUrl = `${apiBaseUrl}/top_hits?api_key=${apiKey}`;
const imageBaseUrl = "";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    //res.json(parsedData);
    res.render("index", { mainData: parsedData.results });
  });
});

router.get("/film/:id", (req, res) => {
  const filmId = req.params.id;
  //const filmUrl = `${apiBaseUrl}/movie/${filmId}?api_key=${apiKey}`;
  const filmUrl = `${apiBaseUrl}/film/${filmId}?api_key=${apiKey}`;
  request.get(filmUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    const dataAddendum = { ...parsedData, production_companies: [] };
    //res.render("single-movie", { filmData: parsedData });
    res.render("single-movie", { filmData: dataAddendum });
  });
});

router.post("/search", (req, res) => {
  const searchTerm = encodeURI(req.body.movieSearch);
  const category = req.body.cat;
  // const searchUrl = `${apiBaseUrl}/search/${category}/?api_key=${apiKey}&query=${searchTerm}`;
  const searchUrl = `${apiBaseUrl}/find/${category}/?api_key=${apiKey}&query=${searchTerm}`;
  request.get(searchUrl, (error, response, data) => {
    const parsedData = JSON.parse(data);
    //res.json(parsedData);
    if (category === "person") {
      //const results = parsedData.results[0].known_for;
      const results = parsedData.results;
      res.render("index", { mainData: results });
      return;
    }
    res.render("index", { mainData: parsedData.results });
  });
});

module.exports = router;
