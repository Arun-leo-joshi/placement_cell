//import all required packages
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./config/mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//for parsing the form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serving the static files
app.use(express.static("./public"));

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//handle session cookie
app.use(
  session({
    name: "Placement Cell",
    secret: "asjfsdhd",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.MONGO_URL,
        autoRemove: "disabled",
      },
      function (err) {
        console.log("Error in the mongo Store", err);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedEmployee);
app.use(flash());
app.use(customMware.setFlash);

//express routes handler
app.use("/", require("./routes"));
//start the server
app.listen(port, (err) => {
  if (err) {
    console.log(`Server Error ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
