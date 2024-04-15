//import requried packeges
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job_Controller");

router.get('/fetch-jobs', jobController.fetch);

module.exports = router;
