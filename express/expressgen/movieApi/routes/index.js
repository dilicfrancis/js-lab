var express = require("express");
var router = express.Router();
const films = require("../data/films");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/top_hits", (req, res, next) => {
  const page = req.query.page || 1;

  const hits = films.filter((film) => film.most_popular === true);
  //calculate page
  const initIndex = (page - 1) * 20;
  const endIndex = (page - 1) * 20 + 19;
  const pageResults = hits.slice(initIndex, endIndex);
  //send json
  res.json({ results: pageResults });
});

module.exports = router;
