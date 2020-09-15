function TextGenerator(chainObj, options) {
  const { prob, min, max } = { prob: 0.5, min: 0, max: Infinity, ...options };
  this._chainObj = { chain: {}, starters: [], ...chainObj };
  this._filteredChain = JSON.parse(JSON.stringify(chainObj));
  this._prob = prob;
  this._min = min;
  this._max = max;
  this._charsObj = {};
  this._charsArr = [];
}

// Validate character cluster given allowed letters
TextGenerator.prototype._validateCluster = function validateCluster(cluster) {
  for (let i = 0; i < cluster.length; i++) if (!this._charsObj[cluster[i]]) return false;
  return true;
};

// Filter array of possible clusters given allowed letters
TextGenerator.prototype._filterClusterArr = function filterClusterArr(clusterArr) {
  const newArr = [];
  let valid = true;
  for (let i = 0; i < clusterArr.length; i++) {
    valid = this._validateCluster(clusterArr[i], this._charsObj);
    if (valid) newArr.push(clusterArr[i]);
    valid = true;
  }
  return newArr;
};

// Filter chainObj with allowed characters
TextGenerator.prototype._filterStates = function filterStates() {
  const { chain, starters } = this._chainObj;
  this._filteredChain.starters = this._filterClusterArr(starters, this._charsObj);
  this._filteredChain.chain = {};
  for (let cluster in chain) {
    if (this._validateCluster(cluster, this._charsObj)) {
      const newCharStates = this._filterClusterArr(chain[cluster], this._charsObj);
      this._filteredChain.chain[cluster] = newCharStates;
    }
  }
};

// Generate word given chain object
TextGenerator.prototype._generateWord = function generateWord() {
  const { chain, starters } = this._filteredChain;
  let word = starters[Math.floor(Math.random() * starters.length)];
  let group = word;
  while ((Object.hasOwnProperty.call(chain, group) && Math.random() < this._prob && word.length <= this._max) || word.length < this._min) {
    if (!chain[group] || chain[group].length === 0) break;
    group = chain[group][Math.floor(Math.random() * chain[group].length)];
    word += group;
  }
  if (word.length > this._max) word = word.slice(0, word.length - group.length);
  return word;
};

// Set chars arr
TextGenerator.prototype.setChars = function setChars(charsStr) {
  for (let i = charsStr.length - 1; i >= 0; i--) this._charsArr.push(charsStr[i]);
};

// Move letters from char arr to char obj
TextGenerator.prototype.addChars = function addChars(num = 1) {
  for (let i = 0; i < num; i++) this._charsObj[this._charsArr.pop()] = true;
  this._filterStates();
};

// Return chars in char object
TextGenerator.prototype.getChars = function getChars() {
  return Object.keys(this._charsObj);
};

// Generate sentence from chain object
TextGenerator.prototype.generateSentence = function generateSentence(wordCount) {
  let sentence = this._generateWord();
  for (let i = 0; i < wordCount - 1; i++) sentence += ' ' + this._generateWord();
  return sentence;
};

export default TextGenerator;
