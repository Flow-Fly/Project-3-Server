const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const User = require("../models/User");
const router = express.Router();
const upload = require("../config/cloudinaryConfig")

router.get("/me", requireAuth, (req, res, next) => {
  res.status(200).json(req.user)
});


// router.get("/", requireAuth, (req, res, next) => {
//   User.find().select('-password')
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch(next);
// });

router.get("/:userId", requireAuth, (req, res, next) => {
  User.findById(req.params.userId).select('-password')
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});


//Get a user from his email 
router.get("/user", requireAuth, (req, res, next) => {
    User.find({email: req.query.email}).select('-password')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  });

  router.patch('/me', requireAuth, upload.single("profileImg"), async (req, res, next) => {
    if (req.file) {
      req.body.profileImg = req.file.path; // Add profileImage key to req.body
    }
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    res.status(201).json(user)
  })

module.exports = router;
