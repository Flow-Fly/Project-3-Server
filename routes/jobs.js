const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const requireAuth = require('../middlewares/requireAuth');
const validateId = require('../middlewares/validateId');

////prefixed ---> app.use('/jobs', require('./routes/jobs'));
// Read all the jobs in db
// 200 : The list of items
// 500 : error
router.get('/', async (req, res, next) => {
  try {
    // when populate, need to put ref as the second parameter
    const allFoundJobs = await Job.find({})
      .sort({ createdAt: -1 })
      .populate('creator', User);
    res.status(200).json(allFoundJobs);
  } catch (error) {
    next(error);
  }
});

// Create one job
// Responses:
// 201 : Responds with the created document
// 500 : error
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const jobInput = req.body;
    //get user info from req.user
    jobInput.creator = req.user;

    const createdJob = await Job.create(jobInput);
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json(error);
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
    const foundJob = await Job.findById(req.params.jobId).populate('creator');
    if (!foundJob) {
      res.status(404).json({ message: 'No job found' });
    } else {
      res.status(200).json(foundJob);
    }
  } catch (error) {
    console.error(error);
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
router.patch(
  '/:jobId',
  requireAuth,
  validateId('jobId'),
  async (req, res, next) => {
    try {
      const foundJob = await Job.findById(req.params.jobId);

      //check if job exists
      if (!foundJob) {
        return res.status(404).json({ message: 'Job not found' });
      }

      //check if authorised to edit
      if (foundJob.creator.toString() !== req.user._id.toString()) {
        res.status(403).json({ message: 'Not authorised to edit this job' });
      }

      //update
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.jobId,
        req.body,
        {
          new: true,
        }
      ).populate('creator');

      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
);

// Delete one job
// 400 : Incorrect mongoose id
// 404 : No item found
// 403 : Creator id doesn't match the session user id
// 204 : Successful
// 500 : error
router.delete(
  '/:jobId',
  requireAuth,
  validateId('jobId'),
  async (req, res, next) => {
    try {
      console.log(req.user);

      const foundJob = await Job.findById(req.params.jobId);

      //check if job exists
      if (!foundJob) {
        return res.status(404).json({ message: 'Job not found' });
      }

      //   //check if authorised to delete
      if (foundJob.creator.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: 'Not authorised to edit this job' });
      }

      //delete
      await Job.findByIdAndDelete(req.params.jobId);

      res.status(204).json({ message: 'Successfully deleted.' });
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
);

module.exports = router;
