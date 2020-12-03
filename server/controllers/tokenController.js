const jwt = require('jsonwebtoken');
const errFactory = require('../errors/errorFactory');

const tokenController = {};

// Create JWT from body and persist as cookie
// eslint-disable-next-line consistent-return
tokenController.create = (req, res, next) => {
  try {
    jwt.sign(req.body, process.env.SECRET, (err, token) => {
      if (err) return next(errFactory(err, errFactory.TOKEN));
      res.cookie('sst', token, { httpOnly: true });
      return next();
    });
  } catch (err) {
    return errFactory(err, errFactory.TOKEN);
  }
};

module.exports = tokenController;
