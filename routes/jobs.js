const express = require('express');
const router = express.Router();

// import jobs controller methods
const { getJobs, newJob } = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);

router.route('/job/new').post(newJob);

module.exports = router;
