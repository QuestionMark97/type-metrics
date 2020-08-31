const fs = require('fs');
const MarkovChain = require('../classes/MarkovChain');

const markovChainController = {};

// Acquire Markov chain for text generation
markovChainController.getChain = (req, res, next) => {
  fs.readFile('../corpus/corpus.txt', { encoding: 'utf8', flag: 'r' }, (err, corpus) => {
    if (err) return next({ log: "Something went wrong with 'getChain' middleware in markovChainController" });
    const englishChain = new MarkovChain(corpus);
    res.local.chain = englishChain;
    return next();
  });
};

module.exports = markovChainController;
