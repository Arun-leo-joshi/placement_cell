//import all required packages
module.exports.home = async (req, res) => {
  try {
    return res.render("home", {
      title: "Placement Cell",
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};

// rendering profile ejs 
module.exports.profile = async (req, res) => {
  try {
    return res.render("profile", {
      title: "Placement Cell",
    });
  } catch (err) {
    console.log(`error in home controller ${err}`);
    return;
  }
};
