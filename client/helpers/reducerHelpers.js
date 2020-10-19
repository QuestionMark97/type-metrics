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
