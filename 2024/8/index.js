import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split(''));

const frequencies = {};
grid.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    if (col !== '.') {
      if (!frequencies[col]) {
        frequencies[col] = [];
      }

      frequencies[col].push([rowI, colI]);
    }
  });
});

const isContainedInGrid = ([row, col]) => row >= 0
  && row < grid.length
  && col >= 0
  && col < grid[0].length;

const distinctAntinodesPart1 = new Set();
Object.entries(frequencies).forEach(([, locations]) => {
  for (let i = 0; i < locations.length; i += 1) {
    for (let j = i + 1; j < locations.length; j += 1) {
      const delta = [locations[i][0] - locations[j][0], locations[i][1] - locations[j][1]];

      const antinodes = [
        [locations[i][0] + delta[0], locations[i][1] + delta[1]],
        [locations[j][0] - delta[0], locations[j][1] - delta[1]],
      ];

      antinodes.forEach((antinode) => {
        if (isContainedInGrid(antinode)) {
          distinctAntinodesPart1.add(`${antinode[0]},${antinode[1]}`);
        }
      });
    }
  }
});
const part1 = distinctAntinodesPart1.size;

const distinctAntinodesPart2 = new Set();
Object.entries(frequencies).forEach(([, locations]) => {
  function walkToBoundary(i, delta) {
    let escaped = false;
    const currentPosition = [locations[i][0], locations[i][1]];
    while (!escaped) {
      if (isContainedInGrid(currentPosition)) {
        distinctAntinodesPart2.add(`${currentPosition[0]},${currentPosition[1]}`);
      } else {
        escaped = true;
      }

      currentPosition[0] += delta[0];
      currentPosition[1] += delta[1];
    }
  }

  for (let i = 0; i < locations.length; i += 1) {
    for (let j = i + 1; j < locations.length; j += 1) {
      const delta = [locations[i][0] - locations[j][0], locations[i][1] - locations[j][1]];
      walkToBoundary(i, delta);
      walkToBoundary(i, delta.map((n) => n * -1));
    }
  }
});
const part2 = distinctAntinodesPart2.size;

console.log({ solution: { part1, part2 } });
