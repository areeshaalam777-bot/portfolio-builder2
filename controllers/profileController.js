const Profile = require("../models/Profile");
const Project = require("../models/Project");

// CREATE OR UPDATE PROFILE
const createProfile = async (req, res) => {
  try {
    const {
      username,
      bio,
      education,
      skills,
      emailAddress,
    } = req.body;

    let profile = await Profile.findOne({
      user: req.user.id,
    });

   if (!username || !username.trim()) {
  return res.status(400).json({
    message: "Username is required.",
  });
}

  
   const safeUsername = username.trim().toLowerCase();

    const existingUsername = await Profile.findOne({
  username: safeUsername,
});

if (
  existingUsername &&
  existingUsername.user.toString() !== req.user.id
) {
  return res.status(400).json({
    message: "Username is already taken.",
  });
}


    const safeSkills = skills
      ? skills.split(",").map((skill) => skill.trim())
      : [];

    const safeSocialLinks = {
      github: req.body["socialLinks[github]"] || "",
      linkedin: req.body["socialLinks[linkedin]"] || "",
    };

    if (profile) {
      profile.username = safeUsername;
      profile.bio = bio;
      profile.education = education;
      profile.skills = safeSkills;
      profile.socialLinks = safeSocialLinks;
      profile.emailAddress = emailAddress;

      await profile.save();

      return res.json(profile);
    }

    profile = await Profile.create({
      user: req.user.id,
      username: safeUsername,
      bio,
      education,
      skills: safeSkills,
      socialLinks: safeSocialLinks,
      emailAddress,
    });

    res.status(201).json(profile);

  } 
  catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
}
};

// GET MY PROFILE
const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PUBLIC PROFILE
const getPublicProfile = async (req, res) => {
  try {
    const username = req.params.username
      ?.trim()
      .toLowerCase();

    const profile = await Profile.findOne({
      username,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    profile.views += 1;

    await profile.save();

    const projects = await Project.find({
      user: profile.user,
    });

    res.json({
      profile,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProfile,
  getMyProfile,
  getPublicProfile,
};