import input from './input';

let currentHorizontalPosition = 0;
let currentDepth1 = 0;
let currentDepth2 = 0;
let currentAim = 0;

const commands = input.split('\n').filter(Boolean)
  .map((inputLine) => {
    const regexMatch = inputLine.match(/([^\s]*) (\d*)/);
    return ({ direction: regexMatch[1], distance: Number(regexMatch[2]) });
  });

commands.forEach(({ direction, distance }) => {
  switch (direction) {
    case 'forward':
      currentHorizontalPosition += distance;
      currentDepth2 += distance * currentAim;
      break;
    case 'up':
      currentDepth1 -= distance;
      currentAim -= distance;
      break;
    case 'down':
      currentDepth1 += distance;
      currentAim += distance;
      break;
    default:
      throw new Error('Unknown direction');
  }
});

console.log({
  solution: {
    part1: currentHorizontalPosition * currentDepth1,
    part2: currentHorizontalPosition * currentDepth2,
  },
});
