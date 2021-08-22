const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require('passport')

const salt = 10;

router.post("/signin", (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) res.send('This user does not exist')
    else {
      req.logIn(user, err => {
        if (err) next(err)
        res.status(200).json(req.user)
      })
    }
  }) (req, res, next)
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).json({ message: "Please complete all fields"})
  // }
  // User.findOne({ email })
  //   .then((userDocument) => {
  //     if (!userDocument) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }

  //     const isValidPassword = bcrypt.compareSync(
  //       password,
  //       userDocument.password
  //     );
  //     if (!isValidPassword) {
  //       return res.status(400).json({ message: "Invalid credentials" });
  //     }

  //     req.session.currentUser = {
  //       // role: "userDocument.role",  // if you need to handle roles
  //       _id: userDocument._id,
  //     };

  //     res.redirect("/api/users/me");
  //   })
  //   .catch(next);
});

router.post("/signup", (req, res, next) => {
  const { email, password, firstName, lastName} = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({message: "Please complete all the fields"})
  }

  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = { email, lastName, firstName, password: hashedPassword};

      User.create(newUser)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.logout()
  res.sendStatus(204)
});

// GOOGLE PASSPORT LOGIN
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
});


module.exports = router;
