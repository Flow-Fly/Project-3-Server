const requireAuth = (req, res, next) => {
  console.log(`${req.user.email} 'is logged in.`)
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = requireAuth;
