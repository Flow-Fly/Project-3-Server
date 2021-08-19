const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
// const requireAuth = require('../middlewares/requireAuth');
const validateId = require('../middlewares/validateId');

////prefixed ---> app.use('/jobs', require('./routes/jobs'));
// read all the jobs in db
// Responses:
// 200 : The list of items
// 500 : error
router.get('/', async (req, res, next) => {
  try {
    // console.log('coucou');.populate('creator')
    const dbRes = await Job.find({});
    res.status(200).json(dbRes);
  } catch (error) {
    // res.status(500).json(error);
    next(error);
  }
});

// read one job in db
// Responses:
// 400 : Incorrect mongoose id
// 404 : No item found
// 200 : Responds with the updated document
// 500 : error
router.get('/:jobId', validateId('jobId'), async (req, res, next) => {
  try {
    const foundJob = await Job.findById(req.params.jobId);
    if (!foundJob) {
      return res.status(404).json({ message: 'No job found' });
    } else {
      return res.status(200).json(foundJob);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
    next(error);
  }
});

module.exports = router;
