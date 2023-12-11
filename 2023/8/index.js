import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const directions = inputLines[0].split('');

const maps = {};
inputLines.slice(1).forEach((line) => {
  const numbers = /([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/.exec(line);

  maps[numbers[1]] = {
    L: numbers[2],
    R: numbers[3],
  };
});

let currentKey = 'AAA';
let stepCountPart1 = 0;
while (currentKey !== 'ZZZ') {
  stepCountPart1 += 1;
  const nextDirection = directions[(stepCountPart1 - 1) % directions.length];
  currentKey = maps[currentKey][nextDirection];
}

const currentKeys = Object.keys(maps).filter((key) => key.endsWith('A'));
let stepCountPart2 = 0;
const firstZEnds = Array.from({ length: currentKeys.length });
while (firstZEnds.some((first) => first === undefined)) {
  stepCountPart2 += 1;
  const nextDirection = directions[(stepCountPart2 - 1) % directions.length];
  currentKeys.forEach((key, index) => {
    currentKeys[index] = maps[key][nextDirection];
    if (firstZEnds[index] === undefined && maps[key][nextDirection].endsWith('Z')) {
      firstZEnds[index] = stepCountPart2;
    }
  });
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

console.log({
  solution: {
    part1: stepCountPart1,
    part2: firstZEnds.reduce(lcm),
  },
});
