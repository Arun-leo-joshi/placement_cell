//import requried packeges
const Employee = require("../models/employee");
const brcypt = require("bcrypt");

//render sign-up page
module.exports.signUp = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("sign_up", {
    title: "Placement Cell | Sign Up",
  });
};
//render sign-In page
module.exports.signIn = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("sign_up", {
    title: "Placement Cell | Sign In",
  });
};

//get the sign up data and create new employee in db
module.exports.create = async (req, res) => {
  try {
    //check if the passeword and confrim password is correct
    if (req.body.password != req.body.confirmPassword) {
      req.flash('error', 'Please Enter Correct Confirm Password');
      console.log("Password not matched");
      return res.redirect("/employees/sign-up");
    }

    //check if the employee already exists
    let employee = await Employee.findOne({ email: req.body.email });

    //insert the new employee if the employee is not exist
    if (!employee) {
      employee = new Employee({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });

      //hash the password before saving into database
      const salt = await brcypt.genSalt(10);
      employee.password = await brcypt.hash(employee.password, salt);
      await employee.save();
      return res.redirect("/employees/sign-up");
    } else {
       req.flash('success', 'Email Already Exist Please Login');
      console.log(`employee already exist`);
      return res.redirect("/employees/sign-up");
    }
  } catch (err) {
    console.log(`error in signup controller of employee ${err}`);
    return;
  }
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  try {
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } catch (err) {
    console.log(`Error in createsession controller ${err}`);
    return;
  }
};

//sign out and destory session of the user
module.exports.destroySession = function (req, res) {
  req.flash("success", "Logged out Successfully");
  req.logout((err) => {
    if (err) {
      return done(err);
    }
  });
  return res.redirect("/");
};

// forrget password page
module.exports.forgetPasswordPage = function (req, res) {
  return res.render("forget_password", {
    title: "Forget Password",
  });
};

module.exports.forgetPasswordLink = async function (req, res) {
  let employee = await Employee.findOne({ email: req.body.email });
  if (!employee) {
    req.flash("error", "User Not Found Please Sign Up or Try Correct Email");
    return res.redirect("/employees/sign-up");
  }
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "Please Enter Correct Confirm Password");
    return res.redirect("back");
  }
  if (req.body.password == req.body.confirmPassword) {
    const salt = await brcypt.genSalt(10);
    employee.password = await brcypt.hash(req.body.password, salt);
    await Employee.updateOne({ password: employee.password });
    req.flash("success", "Password Forget Sucessfully");
    return res.redirect("/employees/sign-in");
  }
  return res.redirect("back");
};
