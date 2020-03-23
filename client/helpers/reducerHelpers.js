// WPM helper function
export function WPM(str, time) {
  return ((str.split(' ').length / time) * 60000).toFixed(2);
}

// Levenshtein distance helper function
export function levenshtein(str1, str2) {
  const matrix = [];
  for (let i = 0; i < str1.length; i++) matrix.push([i]);
  for (let i = 1; i < str2.length; i++) matrix[0].push([i]);
  for (let i = 1; i < str1.length; i++) {
    for (let j = 1; j < str2.length; j++) {
      let subCost = 0;
      if (str1[i - 1] !== str2[j - 1]) subCost = 1;
      matrix[i].push(Math.min(matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + subCost)); // substitution
    }
  }
  return matrix[str1.length - 1][str2.length - 1];
}

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
