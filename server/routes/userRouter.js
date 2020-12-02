const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/',
  userController.list,
  (req, res) => res.status(200).json(res.locals.users));

router.post('/',
  userController.create,
  (req, res) => res.sendStatus(201));

router.get('/:id',
  userController.read,
  (req, res) => res.status(200).json(res.locals.user));

router.put('/:id',
  userController.replace,
  (req, res) => res.sendStatus(204));

router.patch('/:id',
  userController.update,
  (req, res) => res.sendStatus(204));

router.delete('/:id',
  userController.destroy,
  (req, res) => res.sendStatus(204));

module.exports = router;
