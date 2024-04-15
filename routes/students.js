//import requried packeges
const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student_Controller");

router.get('/', studentController.allStudents);
router.post('/create', studentController.create);
router.get('/download-csv', studentController.downloadCSV);
module.exports = router;
