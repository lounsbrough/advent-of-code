import input from './input';

const sortedTotalElfCalories = input.split('\n\n')
  .map((elf) => elf.split('\n')
    .filter(Boolean)
    .reduce((total, calories) => total + parseInt(calories, 10), 0))
  .sort((a, b) => b - a);

console.log({
  solution: {
    part1: sortedTotalElfCalories[0],
    part2: sortedTotalElfCalories[0] + sortedTotalElfCalories[1] + sortedTotalElfCalories[2],
  },
});
