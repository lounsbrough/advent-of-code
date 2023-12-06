import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const getRecordBreakingLimits = (duration, recordDistance) => {
  const root = (duration ** 2 - 4 * recordDistance) ** 0.5;
  return [
    Math.ceil((duration - root) / 2),
    Math.floor((duration + root) / 2)
  ]
};

const getPart1Inputs = (line) => [...line.matchAll(/\d+/g)].map(([n]) => Number(n));
const getPart2Inputs = (line) => [Number([...line.matchAll(/\d+/g)].join(''))]

const raceDurationsPart1 = getPart1Inputs(inputLines[0]);
const raceRecordsPart1 = getPart1Inputs(inputLines[1]);
const raceDurationsPart2 = getPart2Inputs(inputLines[0]);
const raceRecordsPart2 = getPart2Inputs(inputLines[1]);

const getProductOfPossibleRecordCounts = (durations, records) =>
  durations.map((raceDuration, i) => {
    const limits = getRecordBreakingLimits(raceDuration, records[i]);

    return limits[1] - limits[0] + 1;
  }).reduce((agg, cur) => agg * cur, 1);

console.log({
  solution: {
    part1: getProductOfPossibleRecordCounts(raceDurationsPart1, raceRecordsPart1),
    part2: getProductOfPossibleRecordCounts(raceDurationsPart2, raceRecordsPart2)
  }
});
