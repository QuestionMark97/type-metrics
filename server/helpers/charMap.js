const charMap = {
  vowels: {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true
  },
  consonants: {
    'b': true,
    'c': true,
    'd': true,
    'f': true,
    'g': true,
    'h': true,
    'j': true,
    'k': true,
    'l': true,
    'm': true,
    'n': true,
    'p': true,
    'q': true,
    'r': true,
    's': true,
    't': true,
    'v': true,
    'w': true,
    'x': true,
    'y': true,
    'z': true
  }
};

// Determine if letter is a consonant
charMap._isConsonant = function isConsonant(char) {
  if (typeof char !== 'string') return false;
  return (this.consonants[char.toLowerCase()]) ? true : false;
};

// Determine if letter is a vowel
charMap._isVowel = function isVowel(char) {
  if (typeof char !== 'string') return false;
  return (this.vowels[char.toLowerCase()]) ? true : false;
};

// Determine if character is a letter
charMap.isLetter = function isLetter(char) {
  if (typeof char !== 'string') return false;
  return (this.vowels[char.toLowerCase()] || this.consonants[char.toLowerCase()]) ? true : false;
};

// Classify character as a vowel or consonant
charMap.classify = function classify(char) {
  if (this._isVowel(char)) return 'VOWEL';
  else if (this._isConsonant(char)) return 'CONSONANT';
  else return 'NOT_LETTER';
};

module.exports = {
  isLetter: charMap.isLetter.bind(charMap),
  classify: charMap.classify.bind(charMap)
};
