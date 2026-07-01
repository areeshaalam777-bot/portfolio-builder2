const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate JWT
const generateToken = (id, isAdmin) => {
  return jwt.sign(
    {
      id,
      isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const Profile = require("../models/Profile");

    const profile = await Profile.findOne({
      user: user._id,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: profile?.username || "",
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Forgot Password
const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpires =
            Date.now() + 1000 * 60 * 30; // 30 minutes

        await user.save();

        res.json({
            message: "Password reset link generated",
            resetLink: `http://localhost:5000/reset-password/${resetToken}`
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("URL Token:", token);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports={
registerUser,
loginUser,
forgotPassword,
resetPassword
};