const { Router } = require("express");
const router = new Router();

//router.use affects only this router file
//router.use();

router.get("/user", (req, res, next) => res.json({ message: "router works!" }));

// router.all
// router.post
// router.delete
// router.put
//...

module.exports = router;
