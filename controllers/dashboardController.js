const Profile = require("../models/Profile");
const Project = require("../models/Project");

const getDashboard = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const projects = await Project.find({ user: req.user.id });

    res.json({
      profile,
      totalProjects: projects.length,
      projects,
    });

  } 
  catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
}
};

module.exports = { getDashboard };