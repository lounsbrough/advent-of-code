import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const originalStones = inputLines.flatMap((inputLine) => inputLine.split(' ').map(Number));

const stoneCounts = {};
originalStones.forEach((stone) => {
  if (!stoneCounts[stone]) {
    stoneCounts[stone] = 0;
  }
  stoneCounts[stone] += 1;
});

const getNewStones = (stone) => {
  if (stone === 0) {
    return [1];
  }

  if (stone.toString().length % 2 === 0) {
    const digitString = stone.toString();
    const half = digitString.length / 2;
    return [Number(digitString.substring(0, half)), Number(digitString.substring(half))];
  }

  return [stone * 2024];
};

const blink = () => {
  Object.entries({ ...stoneCounts }).forEach(([stone, count]) => {
    stoneCounts[stone] -= count;
    getNewStones(Number(stone)).forEach((newStone) => {
      if (!stoneCounts[newStone]) {
        stoneCounts[newStone] = 0;
      }
      stoneCounts[newStone] += count;
    });
  });
};

for (let i = 1; i <= 25; i += 1) {
  blink();
}
const part1 = Object.values(stoneCounts).reduce((agg, cur) => agg + cur, 0);

for (let i = 1; i <= 50; i += 1) {
  blink();
}
const part2 = Object.values(stoneCounts).reduce((agg, cur) => agg + cur, 0);

console.log({ solution: { part1, part2 } });
