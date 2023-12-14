/* eslint-disable no-param-reassign */
import input from './input.js';

const patterns = input.split('\n\n')
  .map((lines) => lines.split('\n').filter(Boolean));

const reflectionTypes = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const transposePattern = (pattern) => Array.from({ length: pattern[0].length }, (_, i) => pattern.map((p) => p[i]).join(''));

const findReflectionIndex = (pattern, skipIndex) => {
  const index = pattern.slice(1).findIndex((row, i) => {
    if (i === skipIndex) return false;

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

  return index !== -1 ? index : null;
};

const findReflection = (pattern, skip) => {
  const horizontalIndex = findReflectionIndex(
    pattern,
    skip?.type === reflectionTypes.horizontal && skip.index,
  );
  if (horizontalIndex !== null) {
    return {
      type: reflectionTypes.horizontal,
      index: horizontalIndex,
    };
  }

  const verticalIndex = findReflectionIndex(
    transposePattern(pattern),
    skip?.type === reflectionTypes.vertical && skip.index,
  );
  if (verticalIndex !== null) {
    return {
      type: reflectionTypes.vertical,
      index: verticalIndex,
    };
  }

  return null;
};

const reflectionsPart1 = patterns.map(findReflection);

const flipCharAtIndex = (string, index) => string.substring(0, index) + (string[index] === '.' ? '#' : '.') + string.substring(index + 1);

const findReflectionsPart2 = (pattern, patternIndex) => {
  const reflectionPart1 = reflectionsPart1[patternIndex];

  pattern[0] = flipCharAtIndex(pattern[0], 0);

  let reflection = findReflection(pattern, reflectionPart1);
  if (reflection !== null) return reflection;

  let previousColumn = 0;
  let previousRow = 0;
  for (let i = 1; i < pattern.length * pattern[0].length; i += 1) {
    const currentColumn = i % pattern[0].length;
    const currentRow = Math.floor(i / pattern[0].length);

    pattern[previousRow] = flipCharAtIndex(pattern[previousRow], previousColumn);
    pattern[currentRow] = flipCharAtIndex(pattern[currentRow], currentColumn);

    reflection = findReflection(pattern, reflectionPart1);
    if (reflection !== null) return reflection;

    previousRow = currentRow;
    previousColumn = currentColumn;
  }

  return null;
};

const reflectionsPart2 = patterns.map(findReflectionsPart2);

const sumReflections = (reflections) => reflections.reduce(
  (agg, cur) => agg + (cur.type === reflectionTypes.horizontal ? 100 : 1) * (cur.index + 1),
  0,
);

console.log({
  solution: {
    part1: sumReflections(reflectionsPart1),
    part2: sumReflections(reflectionsPart2),
  },
});
