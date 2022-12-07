import input from './input';

const inputLines = input.split('\n').filter(Boolean);
const assignmentPairs = inputLines
  .map((inputLine) => inputLine.split(',')
    .map((assignmentPair) => assignmentPair.split('-').map((n) => parseInt(n, 10))));

const isInRange = (x, [min, max]) => x >= min && x <= max;

const isAssignmentContainedInOther = ([firstPair, secondPair]) => (
  isInRange(firstPair[0], secondPair) && isInRange(firstPair[1], secondPair))
    || (isInRange(secondPair[0], firstPair) && isInRange(secondPair[1], firstPair));

const doesAssigmentOverlap = ([firstPair, secondPair]) => (
  isInRange(firstPair[0], secondPair)
    || isInRange(firstPair[1], secondPair)
    || isInRange(secondPair[0], firstPair)
    || isInRange(secondPair[1], firstPair));

console.log({
  solution: {
    part1:
    assignmentPairs.filter((assignmentPair) => isAssignmentContainedInOther(assignmentPair)).length,
    part2:
    assignmentPairs.filter((assignmentPair) => doesAssigmentOverlap(assignmentPair)).length,
  },
});
