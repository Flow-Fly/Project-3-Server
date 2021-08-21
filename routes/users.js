const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const User = require("../models/User");
const router = express.Router();

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

// router.get("/:userId", requireAuth, (req, res, next) => {
//   User.findById(req.params.userId).select('-password')
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch(next);
// });


//Get a user from his email 
router.get("/user", requireAuth, (req, res, next) => {
    User.find({email: req.query.email}).select('-password')
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  });


module.exports = router;
