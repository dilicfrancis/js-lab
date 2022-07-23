var express = require("express");
var router = express.Router();
const films = require("../data/films");
const people = require("../data/persons");

router.use((req, res, next) => {
  const search = req.query.query;
  if (!search) {
    res.status(400).json({ error: "a search query must be provided" });
    return;
  }
  next();
});

/* GET find page. */
router.get("/movie", function (req, res, next) {
  const search = req.query.query;
  const searchResult = films.filter((film) => {
    const exists =
      film.overview.toLowerCase().includes(search.toLowerCase()) ||
      film.title.toLowerCase().includes(search.toLowerCase());
    return exists;
  });
  res.json({ results: searchResult });
});

router.get("/person", function (req, res, next) {
  const search = req.query.query;
  const searchResult = people.filter((film) =>
    film.name.toLowerCase().includes(search.toLowerCase())
  );
  res.json({ results: searchResult });
});

module.exports = router;
