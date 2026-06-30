const express = require("express");
const router = express.Router();

const {
  addProject,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addProject);

router.get("/", protect, getMyProjects);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

module.exports = router;