//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require("passport");

//home controller for home page
const homeController = require("../controllers/home_Controller");

router.get("/", passport.checkAuthentication, homeController.home);
router.get("/profile", passport.checkAuthentication, homeController.profile);
router.use("/employees", require("./employees"));
router.use("/students", require("./students"));
router.use("/interviews", require("./interviews"));
router.use("/jobs", require("./jobs"));

module.exports = router;
