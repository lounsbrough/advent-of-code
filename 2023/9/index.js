import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const sequences = inputLines.map((line) => line.split(' ').map(Number));

const extrapolateNextNumber = (sequence) => {
  const levels = [[...sequence]];
  while (levels.at(-1).some((n) => n !== 0)) {
    levels.push(levels.at(-1).slice(1).map((n, i) => n - levels.at(-1)[i]));
  }

  levels.at(-1).push(0);
  for (let i = levels.length - 2; i >= 0; i -= 1) {
    levels.at(i).push(
      levels.at(i).at(-1) + levels.at(i + 1).at(-1),
    );
  }

  return levels.at(0).at(-1);
};

console.log({
  solution: {
    part1: sequences.map(extrapolateNextNumber)
      .reduce((agg, cur) => agg + cur, 0),
    part2: sequences.map((s) => extrapolateNextNumber(s.toReversed()))
      .reduce((agg, cur) => agg + cur, 0),
  },
});
