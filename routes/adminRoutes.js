const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getStats,
  getUsers,
  deleteUser,
  getProjects,
  deleteProject,
} = require("../controllers/adminController");

// Dashboard Stats
router.get("/stats", protect, admin, getStats);

// Users
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

// Projects
router.get("/projects", protect, admin, getProjects);
router.delete("/projects/:id", protect, admin, deleteProject);

module.exports = router;