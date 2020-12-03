const { Router } = require('express');
const tokenController = require('../controllers/tokenController');

const router = new Router();

router.post('/',
  tokenController.create,
  (req, res) => res.sendStatus(201));

module.exports = router;
