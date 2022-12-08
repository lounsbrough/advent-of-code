/* eslint-disable no-param-reassign */
import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const initialStackLines = inputLines
  .filter((inputLine) => !inputLine.startsWith('move'));

const initialStackNumbers = initialStackLines.pop().split(/\d/).slice(0, -1);

const initialStacks = {};
initialStackLines.forEach((initialStackLine) => {
  initialStackNumbers.forEach((_, index) => {
    const container = initialStackLine[initialStackNumbers.slice(0, index + 1).join('').length + index];
    if (container.trim()) {
      const newStack = initialStacks[index + 1] || [];
      newStack.unshift(container);
      initialStacks[index + 1] = newStack;
    }
  });
});

const moveCommands = inputLines
  .filter((inputLine) => inputLine.startsWith('move'))
  .map((inputLine) => {
    const moveNumbers = inputLine.match(/move (\d*) from (\d*) to (\d*)/);
    return ({
      count: moveNumbers[1],
      from: moveNumbers[2],
      to: moveNumbers[3],
    });
  });

const crateMover9000FinalStacks = { ...initialStacks };
const crateMover9001FinalStacks = { ...initialStacks };

const moveContainersToNewStack = (stacks, count, from, to, crateMover9001) => {
  const containers = stacks[from].slice(-count);
  stacks[from] = stacks[from].slice(
    0,
    stacks[from].length - count,
  );
  stacks[to] = [...stacks[to], ...(crateMover9001 ? containers : containers.reverse())];
};

moveCommands.forEach(({ count, from, to }) => {
  moveContainersToNewStack(crateMover9000FinalStacks, count, from, to, false);
  moveContainersToNewStack(crateMover9001FinalStacks, count, from, to, true);
});

const getTopStackLetterCode = (stacks) => Object.values(stacks).map((stack) => stack.slice(-1)).join('');

console.log({
  extraData: {
    crateMover9000FinalStacks: JSON.stringify(crateMover9000FinalStacks),
    crateMover9001FinalStacks: JSON.stringify(crateMover9001FinalStacks),
  },
  solution: {
    part1: getTopStackLetterCode(crateMover9000FinalStacks),
    part2: getTopStackLetterCode(crateMover9001FinalStacks),
  },
});
