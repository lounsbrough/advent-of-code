import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const groupsOfThreeRucksacks = [];
const allRucksacks = inputLines.map((inputLine, index) => {
  const chars = inputLine.split('');
  const half = Math.ceil(chars.length / 2);

  if (!(index % 3)) groupsOfThreeRucksacks.push([]);
  groupsOfThreeRucksacks[Math.floor(index / 3)].push(chars);

  return [chars.slice(0, half), chars.slice(half)];
});

const getLetterPriority = (letter) => {
  const charCodeOffset = letter === letter.toUpperCase() ? -38 : -96;

  return letter.charCodeAt() + charCodeOffset;
};

const getRepeatedItemInCompartments = ([firstCompartment, secondCompartment]) => firstCompartment
  .find((first) => secondCompartment.some((second) => second === first));

const getRepeatedItemInRucksacks = (rucksacks) => rucksacks[0]
  .find((r1) => rucksacks[1].some((r2) => r2 === r1) && rucksacks[2].some((r3) => r3 === r1));

const sumOfRepeatedPriorities = allRucksacks
  .map(getRepeatedItemInCompartments)
  .map(getLetterPriority)
  .reduce((total, current) => total + current, 0);

const sumOfGroupPriorities = groupsOfThreeRucksacks
  .map(getRepeatedItemInRucksacks)
  .map(getLetterPriority)
  .reduce((total, current) => total + current, 0);

console.log({
  solution: {
    part1: { sumOfRepeatedPriorities },
    part2: { sumOfGroupPriorities },
  },
});
