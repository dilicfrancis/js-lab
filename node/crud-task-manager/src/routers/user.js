const { Router } = require("express");
const multer = require("multer");
const sharp = require("sharp");
const { welcomeEmail, exitEmail } = require("../emails/accounts");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new Router();

const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a .JPG, .JPEG, or .PNG file"));
    }
    cb(undefined, true);
  },
});

// router.get("/test", (req, res) => res.send("This is a test"));

router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    welcomeEmail(newUser.name, newUser.email);
    const token = await newUser.setToken();
    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(400).send("Error!\n" + e);
  }
  // newUser
  //   .save()
  //   .then((resolve) => res.status(201).send("Success!\n" + resolve))
  //   .catch((err) => res.status(400).send("Error!\n" + err));
});

router.post("/users/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findByAuth(email, password);
    const token = await user.setToken();
    res.send({ user, token });
    //res.send({ user: user.publicProfile(), token });
  } catch (e) {
    res.status(400).send("Invalid Login");
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send("You're now logged out");
  } catch (e) {
    //console.log(e);
    res.status(500).send("Something went wrong");
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("All Sessions are now logged out");
  } catch (e) {
    //console.log(e);
    res.status(500).send("Something went wrong");
  }
});

router.get("/users/profile", auth, async (req, res) => {
  res.send(req.user);

  // try {
  //   // const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send();
  // }

  // .then((resolve) => res.send(resolve))
  // .catch((err) => res.status(500).send())
});

// router.get("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send("No match found");
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
//   // .then((resolve) => {
//   //   if (!resolve) {
//   //     return res.status(404).send("No match found");
//   //   }
//   //   res.send(resolve);
//   // })
//   // .catch((err) => res.status(500).send());
// });

router.post(
  "/users/profile/pic",
  auth,
  upload.single("pic"),
  async (req, res) => {
    //req.user.profile_pic = req.file.buffer;
    const modifiedImage = await sharp(req.file.buffer)
      .png()
      .resize({ width: 450, height: 450 })
      .toBuffer();
    req.user.profile_pic = modifiedImage;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

router.delete(
  "/users/profile/pic",
  auth,
  async (req, res) => {
    req.user.profile_pic = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

router.get(
  "/users/:id/pic",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.profile_pic) {
        throw new Error();
      }
      res.set("Content-Type", "image/png");
      res.send(user.profile_pic);
    } catch (e) {
      res.status(404).send();
    }
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

router.patch("/users/profile", auth, async (req, res) => {
  try {
    //check whether update keys are valid
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).send("Invalid Update Operation");
    }

    // const _id = req.user.id;
    // const user = await User.findById(_id);
    // if (!user) {
    //   return res.status(404).send("No match found");
    // }
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(req.user);
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/users/profile", auth, async (req, res) => {
  try {
    const _id = req.user._id;
    // const user = await User.findByIdAndRemove(_id);
    // if (!user) {
    //   return res.status(404).send("No match found");
    // }
    await req.user.remove();
    exitEmail(req.user.name, req.user.email);
    res.send(req.user);
  } catch (e) {
    res.status(500).send("Invalid Operation");
  }
});

module.exports = router;
