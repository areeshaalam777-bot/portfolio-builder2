const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      next();

    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

  } else {
    return res.status(401).json({
      message: "No token",
    });
  }
};

// ADMIN MIDDLEWARE
const admin = (req, res, next) => {
  console.log("REQ USER =", req.user);

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: "Admin only",
    });
  }
};

module.exports = {
  protect,
  admin
};