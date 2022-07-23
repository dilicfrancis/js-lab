var express = require("express");
var router = express.Router();
const films = require("../data/films");

//gather data on wildcard use
router.param("id", (req, res, next) => {
  //run some code whenever param "id" is used
  //validate special access or api_key etc.
  next();
});

const requireJSON = (req, res, next) => {
  console.log(req.get("content-type"));
  if (!req.is("application/json")) {
    //if a json object is empty, express considers it null
    res
      .status(400)
      .json({ message: "provided content must be application/json" });
    return;
  }
  next();
};

/* GET film page. */
router.get("/top_rated", function (req, res, next) {
  const page = req.query.page || 1;
  const topFilms = films.sort(
    (first, second) => second.vote_average - first.vote_average
  );
  const xIndex = (page - 1) * 20;
  const yIndex = (page - 1) * 20 + 19;
  const sortedFilms = topFilms.slice(xIndex, yIndex);
  res.json(sortedFilms);
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const film = films.find((film) => film.id == id);
  console.log(id);
  if (!film) {
    res.status(400).json({ error: "film not found" });
    return;
  }
  res.json(film);
});

router.post("/:id/rating", requireJSON, function (req, res, next) {
  const id = req.params.id;
  const rating = req.body.value;
  if (rating < 0.5 || rating > 10) {
    res.status(400).json({ message: "Pick a rating between 0.5 and 10" });
    return;
  }
  res.json({ message: "Submitted, thanks!", status_code: 200 });
});

router.delete("/:id/rating", requireJSON, function (req, res, next) {
  res.json({ message: "deleted" });
});

module.exports = router;
