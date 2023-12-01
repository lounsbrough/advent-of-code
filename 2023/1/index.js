import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const numberWords = { one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };
const numberWordKeys = Object.keys(numberWords);

const firstDigitRegex = /\d/;
const lastDigitRegex = /\d(?=[^\d]*$)/;

const calibrationValues = inputLines.map((line) => {
  const firstDigitMatch = firstDigitRegex.exec(line);
  const lastDigitMatch = lastDigitRegex.exec(line);

  let
    firstIndex = firstDigitMatch['index'],
    firstDigit = firstDigitMatch[0],
    lastIndex = lastDigitMatch['index'],
    lastDigit = lastDigitMatch[0];

  numberWordKeys.forEach((numberWord) => {
    const firstWordIndex = line.indexOf(numberWord);
    if (firstWordIndex !== -1) {
      if (firstWordIndex < firstIndex) {
        firstDigit = numberWords[numberWord];
        firstIndex = firstWordIndex;
      }
      const lastWordIndex = line.lastIndexOf(numberWord);
      if (lastWordIndex > lastIndex) {
        lastDigit = numberWords[numberWord];
        lastIndex = lastWordIndex;
      }
    }
  });

  return {
    part1: Number(firstDigitMatch[0] + lastDigitMatch[0]),
    part2: Number(firstDigit + lastDigit)
  }
});

console.log({
  solution: {
    part1: calibrationValues.reduce((acc, { part1 }) => acc + part1, 0),
    part2: calibrationValues.reduce((acc, { part2 }) => acc + part2, 0)
  },
});
