function TextGenerator(chainObj, options) {
  const { prob, min, max } = { prob: 0.5, min: 0, max: Infinity, ...options };
  this._chainObj = { chain: {}, starters: [], ...chainObj };
  this._prob = prob;
  this._min = min;
  this._max = max;
}

// Generate word given chain object
TextGenerator.prototype._generateWord = function () {
  const { chain, starters } = this._chainObj;
  let word = starters[Math.floor(Math.random() * starters.length)];
  let group = word;
  while ((Object.hasOwnProperty.call(chain, group) && Math.random() < this._prob && word.length <= this._max) || word.length < this._min) {
    if (!chain[group]) break;
    group = chain[group][Math.floor(Math.random() * chain[group].length)];
    word += group;
  }
  if (word.length > this._max) word = word.slice(0, word.length - group.length);
  return word;
};

// Generate sentence from chain object
TextGenerator.prototype.generateSentence = function (wordCount) {
  let sentence = this._generateWord();
  for (let i = 0; i < wordCount - 1; i++) sentence += ' ' + this._generateWord();
  return sentence;
};

export default TextGenerator;
