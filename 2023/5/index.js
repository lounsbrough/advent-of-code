import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const measures = {
  seed: 'seed',
  soil: 'soil',
  fertilizer: 'fertilizer',
  water: 'water',
  light: 'light',
  temperature: 'temperature',
  humidity: 'humidity',
  location: 'location'
}

const seeds = [];

const maps = [
  { from: measures.seed, to: measures.soil, rules: [] },
  { from: measures.soil, to: measures.fertilizer, rules: [] },
  { from: measures.fertilizer, to: measures.water, rules: [] },
  { from: measures.water, to: measures.light, rules: [] },
  { from: measures.light, to: measures.temperature, rules: [] },
  { from: measures.temperature, to: measures.humidity, rules: [] },
  { from: measures.humidity, to: measures.location, rules: [] }
];

let currentMap;
inputLines.forEach((line) => {
  if (line.startsWith('seeds:')) {
    const numbers = [...line.matchAll(/\d+/g)].map(([number]) => Number(number));
    seeds.push(...numbers);

  } else if (line.endsWith('map:')) {
    const [_, from, to] = line.match(/(.*)-to-(.*) map/);
    currentMap = maps.find((map) => map.from === from && map.to === to);
  } else {
    const matches = [...line.matchAll(/\d+/g)].map(([number]) => Number(number));
    currentMap.rules.push({
      destinationStart: matches[0],
      sourceStart: matches[1],
      length: matches[2]
    });
  }
});

const mapValue = (sourceValue, rules) => {
  const rule = rules.find(({ sourceStart, length }) =>
    sourceValue >= sourceStart && sourceValue <= sourceStart + length - 1);

  if (rule) {
    return sourceValue + rule.destinationStart - rule.sourceStart;
  }

  return sourceValue;
};

const locationsForSeedsPart1 = seeds.map((seed) => {
  let currentValue = seed;
  let currentMeasure = measures.seed;
  while (currentMeasure !== measures.location) {
    currentMap = maps.find((map) => map.from === currentMeasure);
    currentValue = mapValue(currentValue, currentMap.rules);
    currentMeasure = currentMap.to;
  }

  return currentValue;
});

const seedsPart2 = {
  starting: seeds.filter((_, index) => index % 2 === 0),
  number: seeds.filter((_, index) => index % 2 === 1)
};

let minLocation = Infinity;
seedsPart2.starting.forEach((start, index) => {
for (let seed = start; seed <= start + seedsPart2.number[index] - 1; seed++) {
  let currentValue = seed;
  let currentMeasure = measures.seed;
  while (currentMeasure !== measures.location) {
    currentMap = maps.find((map) => map.from === currentMeasure);
    currentValue = mapValue(currentValue, currentMap.rules);
    currentMeasure = currentMap.to;
  }

  if (currentValue < minLocation) {
    minLocation = currentValue;
    console.log(`current minimum location for part 2: ${minLocation}`);
  }
}
});

console.log({
  solution: {
    part1: Math.min(...locationsForSeedsPart1),
    part2: minLocation
  }
});
