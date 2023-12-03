import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const colorCounts = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = inputLines.map((line) => {
  const rounds = line.replace(/Game \d+:/, '').split('; ').map((round) => ({
    red: Number(round.match(/(\d+) red/)?.[1] ?? 0),
    green: Number(round.match(/(\d+) green/)?.[1] ?? 0),
    blue: Number(round.match(/(\d+) blue/)?.[1] ?? 0),
  }));

  return ({
    id: Number(line.match(/Game (\d+):/)[1]),
    rounds,
  });
});

const validGames = games.filter(({ rounds }) => !rounds.some(({
  red, green, blue,
}) => red > colorCounts.red || green > colorCounts.green || blue > colorCounts.blue));

const minPowers = games.map(({ rounds }) => Math.max(...rounds.map(({ red }) => red ?? 0))
* Math.max(...rounds.map(({ green }) => green ?? 0))
* Math.max(...rounds.map(({ blue }) => blue ?? 0)));

console.log({
  solution: {
    part1: validGames.reduce((agg, { id }) => agg + id, 0),
    part2: minPowers.reduce((agg, cur) => agg + cur, 0),
  },
});
