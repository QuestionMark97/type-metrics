const { isLetter, classify } = require('../helpers/charMap');

function MarkovChain(corpus) {
  this._chainObj = { chain: {}, starters: [] };
  this._REDUNDANCY_ = true;
  this.constructor._words(corpus, (word) => this._addToChain(word));
}

// Get words from text
MarkovChain._words = function words(textData, callback) {
  let word = '';
  for (let i = 0; i < textData.length; i++) {
    if (!isLetter(textData[i])) {
      if (word.length > 1) callback(word);
      word = '';
    } else word += textData[i].toLowerCase();
  }
};

// Break up word into vowel and consonant clusters
MarkovChain._clusters = function clusters(word, callback) {
  let cluster = word[0];
  for (let i = 0; i < word.length; i++) {
    if (classify(word[i]) !== classify(word[i + 1])) {
      callback(cluster);
      cluster = '';
    }
    cluster += word[i + 1];
  }
};

// Add vowel and consonant clusters to chain object
MarkovChain.prototype._addToChain = function addToChain(word) {
  let last = '';
  this.constructor._clusters(word, (cluster) => {
    if (last === '') this._chainObj.starters.push(cluster);
    else if (this._chainObj.chain[last]) {
      if (!this._chainObj.chain[last].includes(cluster) || this._REDUNDANCY_) {
        this._chainObj.chain[last].push(cluster);
      }
    } else this._chainObj.chain[last] = [cluster];
    last = cluster;
  });
};

// Getter method for chain object
MarkovChain.prototype.getChain = function getChain() {
  return this._chainObj;
}

module.exports = MarkovChain;
