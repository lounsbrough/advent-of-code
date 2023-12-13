/* eslint-disable no-param-reassign */
import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const isValidRecord = (record, brokenCounts) => {
  const pattern = `^\\.*${brokenCounts.map((c) => `#{${c}}`).join('\\.+')}\\.*$`;
  return new RegExp(pattern).test(record);
};

let validRecordCount = 0;
const recurse = (record, brokenCounts) => {
  const nextIndex = record.indexOf('?');
  if (nextIndex === -1) {
    if (isValidRecord(record, brokenCounts)) {
      validRecordCount += 1;
    }
  } else {
    recurse(`${record.substring(0, nextIndex)}.${record.substring(nextIndex + 1)}`, brokenCounts);
    recurse(`${record.substring(0, nextIndex)}#${record.substring(nextIndex + 1)}`, brokenCounts);
  }
};

const getValidCount = (line) => {
  const [record, broken] = line.split(' ');

  const brokenCounts = broken.split(',').map(Number);

  recurse(record, brokenCounts);
};

inputLines.forEach(getValidCount);

console.log({
  solution: {
    part1: validRecordCount,
    part2: '?',
  },
});
