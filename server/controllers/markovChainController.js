const fs = require('fs');

const markovChainController = {};

// Acquire text
markovChainController.readCorpus = (req, res, next) => {
  fs.readFile('../corpus/corpus.txt', { encoding: 'utf8', flag: 'r' }, (err, corpus) => {
    if (err) return next({ log: "Something went wrong with 'readCorpus' middleware in markovChainController" });
    res.local.corpus = corpus;
    return next();
  });
};

module.exports = markovChainController;
