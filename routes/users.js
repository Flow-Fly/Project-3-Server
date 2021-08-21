const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.get("/me", requireAuth, (req, res, next) => {
  res.status(200).json(req.user)
});

// router.get("/:userId", requireAuth, (req, res, next) => {
//   User.findById(req.params.userId).select('-password')
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch(next);
// });


module.exports = router;
