const express = require("express");
const multer = require("multer");

const app = express();

const port = process.env.PORT || 3000;

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    //   return cb(new Error("Please upload a PDF file"));
    // }

    if (file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("PDF i say, not docx;)"));
    }

    cb(undefined, true);

    // cb(new Error("File must be a .doc"));
    // cb(undefined, true);
    //cb(undefined,false) //silent rejection of the upload
  },
});

const errorMiddleware = (req, res, next) => {
  throw new Error("middleware error message");
};

app.post(
  "/upload",
  //errorMiddleware,
  upload.single("img"),
  (req, res) => res.status(200).send(),
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

app.listen(port, () => console.log("Server is up on " + port));
