//import the required packegs
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },

    async function (req, email, password, done) {
      let employee = await Employee.findOne({ email: email });
      // console.log(employee);
      if(employee){
        const isPasswordMatched = bcrypt.compareSync(password, employee.password);
        if (!employee || !isPasswordMatched) {
          req.flash("error", "Invalid Username / Password  ");
          req.flash("error", "Don't have an account? Sign Up ");
          console.log("Invalid Username / Password  ");
          return done(null, false);
        }
        
      }
      return done(null, employee);
    }
  )
);

//serializing the employee to decide which key is to be kept in the cookies
passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

//deserializing the employee from the key in the cookies
passport.deserializeUser(async function (id, done) {
  let employeeID = await Employee.findById(id);
  if (!employeeID) {
    console.log("Error in config/passport-local");
    return;
  }

  return done(null, employeeID);
});

//check if employee is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the employee is signed in then the pass on the request to next controller action.
  if (req.isAuthenticated()) {
    return next();
  }

  //if the employee is not singed in
  return res.redirect("/employees/sign-in");
};

passport.setAuthenticatedEmployee = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.employee = req.user;
  }

  next();
};

module.exports = passport;
