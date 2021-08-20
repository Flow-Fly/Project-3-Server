const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
// const requireAuth = require('../middlewares/requireAuth');
const validateId = require('../middlewares/validateId');
const User = require('../models/User');

////prefixed ---> app.use('/jobs', require('./routes/jobs'));
// Read all the jobs in db
// 200 : The list of items
// 500 : error
router.get('/', async (req, res, next) => {
  try {
    // when populate, need to put ref as the second parameter
    const dbRes = await Job.find({}).populate('creator', User);
    res.status(200).json(dbRes);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

// Read one job in db
// 400 : Incorrect mongoose id
// 404 : No item found
// 200 : Responds with the updated document
// 500 : error
router.get('/:jobId', validateId('jobId'), async (req, res, next) => {
  try {
    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob) {
      res.status(404).json({ message: 'No job found' });
    } else {
      res.status(200).json(foundJob);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
    next(error);
  }
});

// Create one job
// Responses:
// 201 : Responds with the created document
// 500 : error
// requireAuth
router.post('/', async (req, res, next) => {
  try {
    const jobInput = req.body;

    //get user id from the session
    // console.log(req.session.currentUserId);
    //?????
    // jobInput.creator = req.session.currentUserId;

    const createdJob = await Job.create(jobInput);
    // // .execPopulate();
    // // Populate on .create() does not work, but we can use populate() on the document once its created !
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// Delete one job
// 400 : Incorrect mongoose id
// 404 : No item found
// 403 : Creator id doesn't match the session user id
// 204 : Successful
// 500 : error
// requireAuth
router.delete('/:jobId', validateId('jobId'), async (req, res, next) => {
  try {
    // console.log(req.session);
    const foundJob = await Job.findById(req.params.jobId);

    //check if job exists
    if (!foundJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    //   //check if authorised to delete
    // if (foundJob.creator.toString() !== req.session.currentUser) {
    //   return res
    //     .status(403)
    //     .json({ message: 'Not authorised to edit this job' });
    // }

    //delete
    await Job.findByIdAndDelete(req.params.jobId);

    res.status(204).json({ message: 'Successfully deleted.' });
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

// Update one job
// 400 : Incorrect mongoose id
// 404 : No item found
// 403 : Creator id doesn't match the session user id
// 200 : Responds with the updated document
// 500 : error
// requireAuth
router.patch('/:jobId', validateId('jobId'), async (req, res, next) => {
  try {
    const foundJob = await Job.findById(req.params.jobId);

    //check if job exists
    if (!foundJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    //check if authorised to edit
    // if (foundJob.creator.toString() !== req.session.currentUser) {
    //   res.status(403).json({ message: 'Not authorised to edit this job' });
    // }

    //update
    const dbRes = await Job.findByIdAndUpdate(req.params.jobIsd, req.body, {
      new: true,
    }).populate('creator');

    res.status(200).json(dbRes);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

module.exports = router;
