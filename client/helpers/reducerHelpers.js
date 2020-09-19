// Map key code to matrix position
export function keyCodeToMatPos(keyCode) {
  switch (keyCode) {
    case 81:
    case 'q':
      return [0, 0];
    case 87:
    case 'w':
      return [0, 1];
    case 69:
    case 'e':
      return [0, 2];
    case 82:
    case 'r':
      return [0, 3];
    case 84:
    case 't':
      return [0, 4];
    case 89:
    case 'y':
      return [0, 5];
    case 85:
    case 'u':
      return [0, 6];
    case 73:
    case 'i':
      return [0, 7];
    case 79:
    case 'o':
      return [0, 8];
    case 80:
    case 'p':
      return [0, 9];
    case 65:
    case 'a':
      return [1, 0];
    case 83:
    case 's':
      return [1, 1];
    case 68:
    case 'd':
      return [1, 2];
    case 70:
    case 'f':
      return [1, 3];
    case 71:
    case 'g':
      return [1, 4];
    case 72:
    case 'h':
      return [1, 5];
    case 74:
    case 'j':
      return [1, 6];
    case 75:
    case 'k':
      return [1, 7];
    case 76:
    case 'l':
      return [1, 8];
    case 90:
    case 'z':
      return [2, 0];
    case 88:
    case 'x':
      return [2, 1];
    case 67:
    case 'c':
      return [2, 2];
    case 86:
    case 'v':
      return [2, 3];
    case 66:
    case 'b':
      return [2, 4];
    case 78:
    case 'n':
      return [2, 5];
    case 77:
    case 'm':
      return [2, 6];
    case 32:
    case ' ':
      return [3, 0];
    default:
      return [-1, -1];
  }
}

// Function for normalizing speeds
export function getKeySpeeds(charTimes) {
  const speed = {};
  let minTime = Infinity;
  let maxTime = 0;
  Object.entries(charTimes).forEach(([char, data]) => {
    let len = 0;
    const sum = data.reduce((tot, subArr) => {
      len += subArr.length;
      return tot + subArr.reduce((acc, val) => acc + val, 0);
    }, 0);
    const mean = sum / len;
    speed[char] = {};
    // Set avgTime and cpm
    speed[char].avgTime = mean;
    speed[char].cpm = 60000 / mean;
    // Get max and mi n cpms
    minTime = Math.min(minTime, speed[char].cpm);
    maxTime = Math.max(maxTime, speed[char].cpm);
  });
  Object.entries(speed).forEach(([char, data]) => {
    const mean = data.cpm;
    speed[char].relSpeed = (mean - minTime) / (maxTime - minTime);
  });
  return speed;
}

// Function for normalizing errors
export function getKeyAccuracies(charErrors, unlockedChars) {
  const keyAcc = {};
  let minErr = Infinity;
  let maxErr = 0;
  // Only execute when charErrors has at least one property
  const { length } = Object.keys(charErrors);
  if (length !== 0) {
    // Get max/min number of non-zero errors
    Object.entries(charErrors).forEach(([char, data]) => {
      const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
      keyAcc[char] = { avgErr: mean };
      minErr = Math.min(minErr, mean);
      maxErr = Math.max(maxErr, mean);
    });
    // Populate keyAcc with properties
    Object.entries(keyAcc).forEach(([char, { avgErr }]) => {
      const trueRelErr = avgErr / maxErr;
      const relErr = ((avgErr - minErr) / (maxErr - minErr));
      keyAcc[char].dispRelErr = (length === unlockedChars.length + 1) ? relErr : trueRelErr;
      keyAcc[char].colorRelErr = (relErr === undefined
        || Number.isNaN(relErr)) ? trueRelErr : relErr;
    });
  }
  return keyAcc;
}
