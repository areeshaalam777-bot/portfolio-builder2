const User = require("../models/User");
const Project = require("../models/Project");
const Profile = require("../models/Profile");

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalProfiles = await Profile.countDocuments();

    res.json({
      totalUsers,
      totalProjects,
      totalProfiles,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }

        await Profile.deleteOne({ user: user._id });

        await Project.deleteMany({ user: user._id });

        await User.findByIdAndDelete(user._id);

        res.json({
            message:"User deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// Get All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
  getUsers,
  deleteUser,
  getProjects,
  deleteProject,
};
