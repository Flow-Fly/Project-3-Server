const mongoose = require('mongoose');

function validateId(paramKey) {
  return (req, res, next) => {
    if (mongoose.isValidObjectId(req.params[paramKey])) {
      next();
    } else {
      const error = new Error('Not a valid object id');
      error.status = 400;
      next(error);
    }
  };
}

module.exports = validateId;
