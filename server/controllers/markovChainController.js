const fs = require('fs');
const path = require('path');
const MarkovChain = require('../classes/MarkovChain');

const markovChainController = {};

// Acquire Markov chain object for text generation
markovChainController.getChain = (req, res, next) => {
  fs.readFile(path.resolve(__dirname, '../corpus/corpus.txt'), { encoding: 'utf8', flag: 'r' }, (err, corpus) => {
    if (err) return next({ 
      log: err,
      msg: { err: "Something went wrong with 'getChain' middleware in markovChainController. See logs for details" } });
    const englishChain = new MarkovChain(corpus);
    res.locals.chain = englishChain.getChain();
    return next();
  });
};

module.exports = markovChainController;
