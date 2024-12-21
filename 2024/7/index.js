import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const inputs = inputLines.map((inputLine) => inputLine.split(': ')).map(([testValue, operators]) => ({
  testValue: BigInt(testValue),
  operators: operators.split(' ').map(BigInt),
}));

const checkChain = (targetValue, currentValue, remainingOperators, allowConcat) => {
  if (currentValue === targetValue && !remainingOperators.length) {
    return true;
  }

  if (currentValue > targetValue || !remainingOperators.length) {
    return false;
  }

  const nextNumber = remainingOperators.shift();

  return checkChain(targetValue, currentValue + nextNumber, [...remainingOperators], allowConcat)
    || checkChain(targetValue, currentValue * nextNumber, [...remainingOperators], allowConcat)
    || (allowConcat && checkChain(targetValue, BigInt(`${currentValue}${nextNumber}`), [...remainingOperators], allowConcat));
};

const part1 = inputs.filter(
  ({ testValue, operators }) => {
    const operatorsCopy = [...operators];
    const firstNumber = operatorsCopy.shift();
    return checkChain(testValue, firstNumber, operatorsCopy, false);
  },
).reduce((agg, { testValue }) => agg + testValue, BigInt(0));

const part2 = inputs.filter(
  ({ testValue, operators }) => {
    const operatorsCopy = [...operators];
    const firstNumber = operatorsCopy.shift();
    return checkChain(testValue, firstNumber, operatorsCopy, true);
  },
).reduce((agg, { testValue }) => agg + testValue, BigInt(0));

console.log({ solution: { part1, part2 } });
