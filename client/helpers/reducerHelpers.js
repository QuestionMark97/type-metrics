// WPM helper function
export function WPM(str, time) {
  return ((str.split(' ').length / time) * 6000).toFixed(2);
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
