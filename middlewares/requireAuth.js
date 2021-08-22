const requireAuth = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = requireAuth;
