import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const lists = inputLines.reduce((agg, inputLine) => {
  const numbers = inputLine.split('   ').map(Number);
  agg[0].push(numbers[0]);
  agg[1].push(numbers[1]);
  return agg;
}, [[], []]);

lists[0].sort();
lists[1].sort();

const part1 = lists[0].reduce((agg, n1, i) => agg + Math.abs(n1 - lists[1][i]), 0);

const part2 = lists[0].reduce((agg, n1) => {
  const firstIndex = lists[1].findIndex((n2) => n2 === n1);
  if (firstIndex === -1) {
    return agg;
  }

  let count = 1;
  for (let j = firstIndex + 1; j < lists[1].length && lists[1][j] === n1; j += 1) {
    count += 1;
  }

  return agg + count * n1;
}, 0);

console.log({ solution: { part1, part2 } });
