//import requried packeges
const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interview_Controller");

router.get("/", interviewController.allInterviews);
router.post("/create", interviewController.create);
router.post("/:interviewId/allocate", interviewController.allocateStudent);
router.get("/:interviewId", interviewController.interviewDetails);
router.post("/:interviewId/result", interviewController.markResult);
module.exports = router;
