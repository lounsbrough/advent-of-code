import input from './input.js';

const patterns = input.split('\n\n')
  .map((lines) => lines.split('\n').filter(Boolean));

const findReflection = (pattern) => pattern.slice(1).findIndex((row, i) => {
  if (row === pattern[i]) {
    const currentPair = [i, i + 1];
    do {
      if (pattern[currentPair[0]] !== pattern[currentPair[1]]) {
        return false;
      }
      currentPair[0] -= 1;
      currentPair[1] += 1;
    } while (currentPair[0] >= 0 && currentPair[1] < pattern.length);

    return true;
  }

  return false;
});

const transposePattern = (pattern) => Array.from({ length: pattern[0].length }, (_, i) => pattern.map((p) => p[i]).join(''));

const part1 = patterns.map((pattern) => {
  const horizontalReflection = findReflection(pattern);
  if (horizontalReflection !== -1) {
    return 100 * (horizontalReflection + 1);
  }

  const verticalReflection = findReflection(transposePattern(pattern));
  return verticalReflection + 1;
}).reduce((agg, cur) => agg + cur, 0);

console.log({
  solution: {
    part1,
    part2: '?',
  },
});
