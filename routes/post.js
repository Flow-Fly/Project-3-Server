const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const requireAuth = require('../middlewares/requireAuth');
const validateId = require('../middlewares/validateId');
const upload = require('../config/cloudinaryConfig');

// /posts      GET	  none	   Returns all posts
// /posts      POST	JSON	Creates a new posts
// /posts      /:id	 GET	none	Returns a posts
// /posts      /:id	 PATCH	JSON	Updates a posts
// /posts      /:id	 DELETE	none	Deletes a specific job

////prefixed ---> app.use('/post', require('./routes/post'));
// Read all the post in db
// 200 : The list of items
// 500 : error
router.get('/', async (req, res, next) => {
  try {
    const allFoundPosts = await Article.find({})
      .sort({ createdAt: -1 })
      .populate('creator', User);
    res.status(200).json(allFoundPosts);
  } catch (error) {
    next(error);
  }
});

// Create one post
// Responses:
// 201 : Responds with the created document
// 500 : error
// requireAuth
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    let postInput = req.body;
    postInput.creator = req.user;
    //For testing
    //postInput.creator='611e73519c589a0e2821295e';
    const createdPost = await Article.create(postInput);
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// Read one post in db using an ID
// 400 : Incorrect mongoose id
// 404 : No item found
// 200 : Responds with the updated document
// 500 : error
// requireAuth
router.get('/:postId', validateId('postId'), async (req, res, next) => {
  try {
    const foundPost = await Article.findById(req.params.postId).populate(
      'creator'
    );
    if (!foundPost) {
      res.status(404).json({ message: 'No post found' });
    } else {
      res.status(200).json(foundPost);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
    next(error);
  }
});

//Update one post by ID
// 400 : Incorrect mongoose id
// 404 : No item found
// 403 : Creator id doesn't match the session user id
// 200 : Responds with the updated document
// 500 : error
// requireAuth
router.patch(
  '/:postId',
  validateId('postId'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = req.file.path; // Add profileImage key to req.body
      }
      console.log(req.body);
      const foundPost = await Article.findById(req.params.postId);

      //check if job exists
      if (!foundPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      //check if authorised to edit
      if (foundPost.creator.toString() !== req.user._id.toString()) {
        res.status(403).json({ message: 'Not authorised to edit this job' });
      }

      //update
      const updatedPost = await Article.findByIdAndUpdate(
        req.params.postId,
        req.body,
        {
          new: true,
        }
      ).populate('creator');

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
);

// Delete one post
// 400 : Incorrect mongoose id
// 404 : No item found
// 403 : Creator id doesn't match the session user id
// 204 : Successful
// 500 : error
// requireAuth
router.delete('/:postId', validateId('postId'), async (req, res, next) => {
  try {
    // console.log(req.session);
    const foundPost = await Article.findById(req.params.postId);

    //check if post exists
    if (!foundPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    //   //check if authorised to delete
    if (foundPost.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorised to edit this job' });
    }

    //delete
    await Article.findByIdAndDelete(req.params.postId);

    res.status(204).json({ message: 'Successfully deleted.' });
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

module.exports = router;
