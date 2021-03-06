const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const User = require('../models/User');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');

router.get('/me', requireAuth, (req, res, next) => {
  res.status(200).json(req.user);
});

router.patch(
  '/me',
  requireAuth,
  upload.single('profileImg'),
  async (req, res, next) => {
    if (req.file) {
      req.body.profileImg = req.file.path; // Add profileImage key to req.body
    }
    //We don't want to update favPosts/jobs through the update profile. Plus it crash the server.
    delete req.body.favouritePosts;
    delete req.body.favouriteJobs;
    if (req.body.email) {
      try {
        const existAlready = await User.findOne({ email: req.body.email });
        if (existAlready.length !== 0) {
          const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
          });
          res.status(201).json(user);
        } else {
          res.status(400)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
);

//get all users email
router.get('/emails', requireAuth, (req, res, next) => {
  User.find()
    .select('email')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

//Get a user from his email
router.get('/user/email', requireAuth, (req, res, next) => {
  User.find({ email: req.query.email })
    .select('-password')
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Regarding Favourite Lists

router.get('/favourites/all', requireAuth, async (req, res, next) => {
  let userId = req.user._id;
  const user = await User.findById(userId).populate([
    'favouritePosts',
    'favouriteJobs',
  ]);
  let response = {};
  response.favouritePosts = user.favouritePosts;
  response.favouriteJobs = user.favouriteJobs;
  res.status(201).json(response);
});

router.patch(
  '/addFavouritePost/:postId',
  requireAuth,
  async (req, res, next) => {
    let postId = req.params.postId;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { favouritePosts: postId } },
      { new: true }
    );
    res.status(201).json(user);
  }
);

router.patch(
  '/deleteFavouritePost/:postId',
  requireAuth,
  async (req, res, next) => {
    let postId = req.params.postId;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favouritePosts: postId } },
      { new: true }
    );
    res.status(201).json(user);
  }
);
//http://localhost:4000/api/users/deleteFavouritPost/61264af2cdd5a60c2bdfe0e4/6125fc08c1de1907a2a2b4ca
router.patch('/addFavouriteJob/:jobId', requireAuth, async (req, res, next) => {
  let jobId = req.params.jobId;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { favouriteJobs: jobId } },
    { new: true }
  );
  res.status(201).json(user);
});

router.patch(
  '/deleteFavouriteJob/:jobId',
  requireAuth,
  async (req, res, next) => {
    let jobId = req.params.jobId;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favouriteJobs: jobId } },
      { new: true }
    );
    res.status(201).json(user);
  }
);

router.get('/:userId', requireAuth, (req, res, next) => {
  User.findById(req.params.userId)
    .select('-password')
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;
