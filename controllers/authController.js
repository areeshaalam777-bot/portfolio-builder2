// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const generateToken = (id, isAdmin) => {
//   return jwt.sign(
//     {
//       id,
//       isAdmin,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "30d",
//     }
//   );
// };

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
  
//     if (userExists) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword =
//       await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     console.log("USER FROM DB:", user);
//     console.log("TOKEN ADMIN:", user.isAdmin);
//     // if (
//     //   user &&
//     //   (await bcrypt.compare(
//     //     password,
//     //     user.password
//     //   ))
//     // )
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     console.log("PASSWORD MATCH:", passwordMatch);

// if (user && passwordMatch) 
//      {
//      console.log("TOKEN ADMIN:", user.isAdmin);
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
        
//         token: generateToken(user._id, user.isAdmin),
//       });
//     } else {

//       res.status(401).json({
//         message: "Invalid Credentials",
//       });

//     }

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  registerUser,
  loginUser,
};