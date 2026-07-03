const express = require("express");
const router = express.Router();

const {
  createProfile,
  getMyProfile,
  getPublicProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, upload.none(), createProfile);

router.get("/me", protect, getMyProfile);

router.get("/:username", getPublicProfile);
module.exports = router;