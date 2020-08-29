function MarkovChain(textData) {}

// Get words from text
MarkovChain._words = function (textData, callback) {
  let word = '';
  for (let i = 0; i < textData.length; i++) {
    if (!isLetter(textData[i])) {
      if (word.length > 1) callback(word);
      word = '';
    } else word += textData[i].toLowerCase();
  }
};

// Break up word into vowel and consonant clusters
MarkovChain._clusters = function (word, callback) {
  let substruct = word[0];
  for (let i = 0; i < word.length; i++) {
    if (classify(word[i]) !== classify(word[i + 1])) {
      callback(substruct);
      substruct = '';
    }
    substruct += word[i + 1];
  }
};

module.exports = MarkovChain;
