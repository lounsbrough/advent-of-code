import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const grid = inputLines.map((inputLine) => inputLine.split('').map(Number));

const trailheads = [];
grid.forEach((row, rowI) => {
  row.forEach((col, colI) => {
    if (col === 0) {
      trailheads.push([rowI, colI]);
    }
  });
});

const countTrails = (position, n, foundPeaks) => {
  if (grid[position[0]]?.[position[1]] !== n) {
    return 0;
  }

  if (n === 9) {
    if (!foundPeaks) {
      return 1;
    }

    const peakKey = `${position[0]},${position[1]}`;
    if (foundPeaks.has(peakKey)) {
      return 0;
    }

    foundPeaks.add(peakKey);
    return 1;
  }

  return countTrails([position[0] - 1, position[1]], n + 1, foundPeaks)
    + countTrails([position[0], position[1] + 1], n + 1, foundPeaks)
    + countTrails([position[0] + 1, position[1]], n + 1, foundPeaks)
    + countTrails([position[0], position[1] - 1], n + 1, foundPeaks);
};

const part1 = trailheads.reduce((agg, trailhead) => agg + countTrails(trailhead, 0, new Set()), 0);

const part2 = trailheads.reduce((agg, trailhead) => agg + countTrails(trailhead, 0), 0);

console.log({ solution: { part1, part2 } });
