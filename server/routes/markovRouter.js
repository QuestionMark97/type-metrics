const express = require('express');
const markovChainController = require('../controllers/markovChainController');

const router = express.Router();

// Serve Markov chain obj for text generation
router.get('/',
  markovChainController.getChain,
  (req, res) => res.status(200).json(res.locals.chain));

module.exports = router;
