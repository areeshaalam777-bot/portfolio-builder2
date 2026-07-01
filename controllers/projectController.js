const Project = require("../models/Project");

// Add Project
const addProject = async (req, res) => {
  try {
    const { title, description, github, liveLink } = req.body;

    const project = await Project.create({
      user: req.user.id,
      title,
      description,
      github,
      liveLink,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Projects
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user.id,
    });

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    Object.assign(project, req.body);

    await project.save();

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await project.deleteOne();

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
  addProject,
  getMyProjects,
  updateProject,
  deleteProject,
};