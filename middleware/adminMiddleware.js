const admin = (req, res, next) => {

  console.log("REQ USER =", req.user);

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Admin only"
    });
  }
};

module.exports = { admin };