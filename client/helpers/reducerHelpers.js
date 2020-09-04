// Map key code to matrix position
export function keyCodeToMatPos(keyCode) {
  switch (keyCode) {
    case 81:
      return [0, 0];
    case 87:
      return [0, 1];
    case 69:
      return [0, 2];
    case 82:
      return [0, 3];
    case 84:
      return [0, 4];
    case 89:
      return [0, 5];
    case 85:
      return [0, 6];
    case 73:
      return [0, 7];
    case 79:
      return [0, 9];
    case 80:
      return [0, 10];
    case 65:
      return [1, 0];
    case 83:
      return [1, 1];
    case 68:
      return [1, 2];
    case 70:
      return [1, 3];
    case 71:
      return [1, 4];
    case 72:
      return [1, 5];
    case 74:
      return [1, 6];
    case 75:
      return [1, 7];
    case 76:
      return [1, 8];
    case 90:
      return [2, 0];
    case 88:
      return [2, 1];
    case 67:
      return [2, 2];
    case 86:
      return [2, 3];
    case 66:
      return [2, 4];
    case 78:
      return [2, 5];
    case 77:
      return [2, 6];
    case 32:
      return [3, 0];
    default:
      return [-1, -1];
  }
}

// Function for calculating confidence
export function getConfidence(charTimes) {
  const confidence = {};
  let globalSum = 0;
  let globalLen = 0;
  for (let char in charTimes) {
    const localSum = charTimes[char].reduce((acc, val) => acc + val)
    const localLen = charTimes[char].length;
    const mean = localSum / localLen;
    globalSum += localSum;
    globalLen += localLen;
    confidence[char] = mean;
  }
  for (let char in charTimes) {
    confidence[char] = (globalSum / (globalLen * confidence[char])).toFixed(2);
  }
  console.log(confidence);
  return confidence;
}
