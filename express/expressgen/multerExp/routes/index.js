var express = require("express");
const multer = require("multer");
const fs = require("fs");
var router = express.Router();

const upload = multer({
  dest: "public/images/uploads",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/form", upload.single("meme"), function (req, res, next) {
  // res.json({
  //   desc: req.body,
  //   file: req.file,
  // });
  const newPath = `public/images/uploads/${req.file.originalname}${Date.now()}`;
  fs.rename(req.file.path, newPath, () => res.json("file uploaded"));
});
router.post("/memes", upload.array("memes"), function (req, res, next) {
  res.json({
    desc: req.body,
    file: req.files,
  });
  const newPath = `public/images/uploads/${req.file.originalname}${Date.now()}`;
  fs.rename(req.file.path, newPath, () => res.json("file uploaded"));
});

module.exports = router;
