//import requried packeges
const express = require("express");
const router = express.Router();
const passport = require("passport");

const employeeController = require("../controllers/employee_Controller");

router.get("/sign-up", employeeController.signUp);
router.get("/sign-in", employeeController.signIn);
router.post("/create", employeeController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "back" , failureFlash:"Don't have an account? Sign Up" }),
  employeeController.createSession
);
router.get("/sign-out", employeeController.destroySession);
// Forget password.
router.get("/forget-password", employeeController.forgetPasswordPage);
router.post("/forget-password-page", employeeController.forgetPasswordLink);
module.exports = router;
