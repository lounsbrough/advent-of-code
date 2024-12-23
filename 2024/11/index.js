import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const originalStones = inputLines.flatMap((inputLine) => inputLine.split(' ').map(Number));

const stonesPart1 = [...originalStones];
const blink = () => {
  let i = 0;
  while (i < stonesPart1.length) {
    const stone = stonesPart1[i];
    if (stone === 0) {
      stonesPart1[i] = 1;
    } else if (stone.toString().length % 2 === 0) {
      const digitString = stone.toString();
      const half = digitString.length / 2;
      stonesPart1[i] = Number(digitString.substring(0, half));
      stonesPart1.splice(
        i,
        0,
        Number(digitString.substring(half)),
      );
      i += 1;
    } else {
      stonesPart1[i] = stone * 2024;
    }

    i += 1;
  }
};

for (let i = 1; i <= 25; i += 1) {
  blink();
}

console.log({ solution: { part1: stonesPart1.length, part2: '?' } });
