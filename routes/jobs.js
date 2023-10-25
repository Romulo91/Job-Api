const express = require('express');
const router = express.Router();

// import jobs controller methods
const {
  getJobs,
  getJob,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);

router.route('/job/:id').get(getJob);

router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);

router.route('/job/new').post(newJob);

router.route('/job/:id').put(updateJob).delete(deleteJob);

module.exports = router;
