const db = require('../models/models.js');
const errFactory = require('../errors/errorFactory');

const userController = {};

// Middleware for listing all user resources
// eslint-disable-next-line consistent-return
userController.list = (req, res, next) => {
  try {
    const queryStr = 'SELECT username, firstname, lastname FROM users';
    db.query(queryStr)
      .then((data) => {
        res.locals.users = data.rows;
        return next();
      })
      .catch((err) => next(errFactory(err, errFactory.LIST, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.LIST));
  }
};

// Middleware for creating user resource
// eslint-disable-next-line consistent-return
userController.create = (req, res, next) => {
  try {
    const {
      username, email, password, firstname, lastname
    } = req.body;
    const queryStr = 'INSERT INTO users (username, email, password, firstname, lastname) VALUES($1, $2, $3, $4, $5);';
    const params = [username, email, password, firstname, lastname];
    db.query(queryStr, params)
      .then(() => next())
      .catch((err) => next(errFactory(err, errFactory.CREATE, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.CREATE));
  }
};

// Middleware for reading user resource
// eslint-disable-next-line consistent-return
userController.read = (req, res, next) => {
  try {
    const queryStr = 'SELECT username, email, firstname, lastname, created_at FROM users WHERE id = $1;';
    const params = [req.params.id];
    db.query(queryStr, params)
      .then((data) => {
        [res.locals.user] = data.rows;
        return next();
      })
      .catch((err) => next(errFactory(err, errFactory.READ, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.READ));
  }
};

// Middleware for replacing user resource
// eslint-disable-next-line consistent-return
userController.replace = (req, res, next) => {
  try {
    const {
      username, email, password, firstname, lastname
    } = req.body;
    const queryStr = 'UPDATE users SET username = $1, email = $2, password = $3, firstname = $4, lastname = $5 WHERE id = $6';
    const params = [username, email, password, firstname, lastname, req.params.id];
    db.query(queryStr, params)
      .then(() => next())
      .catch((err) => next(errFactory(err, errFactory.UPDATE, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.UPDATE));
  }
};

// Middleware for updating user resource
// eslint-disable-next-line consistent-return
userController.update = (req, res, next) => {
  try {
    // Whitelist
    const {
      username, email, password, firstname, lastname
    } = req.body;
    const body = {
      username, email, password, firstname, lastname
    };
    // Construct queryStr and params
    let queryStr = 'UPDATE users SET';
    const params = [];
    const keys = Object.keys(body);
    let paramIndex = 1;
    for (let i = 0; i < keys.length; i++) {
      if (body[keys[i]] !== undefined) {
        queryStr += ` ${keys[i]} = $${paramIndex++},`;
        params.push(body[keys[i]]);
      }
    }
    queryStr = `${queryStr.slice(0, queryStr.length - 1)} WHERE id = $${paramIndex};`;
    params.push(req.params.id);
    // Query database
    db.query(queryStr, params)
      .then(() => next())
      .catch((err) => next(errFactory(err, errFactory.UPDATE, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.UPDATE));
  }
};

// Middleware for destroying user resource
// eslint-disable-next-line consistent-return
userController.destroy = (req, res, next) => {
  try {
    const queryStr = 'DELETE FROM users WHERE id = $1;';
    const params = [req.params.id];
    db.query(queryStr, params)
      .then(() => next())
      .catch((err) => next(errFactory(err, errFactory.DESTROY, 400)));
  } catch (err) {
    return next(errFactory(err, errFactory.DESTROY));
  }
};

module.exports = userController;
