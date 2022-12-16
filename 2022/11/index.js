/* eslint-disable no-new-func */
import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const inputMonkeys = [];
let monkeys;

const getMonkeysCopy = () => ([...inputMonkeys.map((inputMonkey) => ({
  ...inputMonkey,
  throwToMonkey: { ...inputMonkey.throwToMonkey },
  items: [...inputMonkey.items],
}))]);

const operationStringToFunction = (equation, old) => Function(
  `'use strict'; return (${equation.replaceAll('old', old)})`,
)();

inputLines.forEach((inputLine) => {
  if (/monkey \d:/i.test(inputLine)) {
    inputMonkeys.push({
      throwToMonkey: {},
      itemsInspected: 0,
    });
  } else if (/starting items:/i.test(inputLine)) {
    const startingItems = inputLine.match(/starting items: ([\d,\s]+)/i)[1]
      .split(', ').map(Number);
    inputMonkeys.at(-1).items = startingItems;
  } else if (/operation:/i.test(inputLine)) {
    const equation = inputLine.match(/operation: new = (.*)/i)[1];
    inputMonkeys.at(-1).operation = (old) => operationStringToFunction(equation, old);
  } else if (/test: divisible by/i.test(inputLine)) {
    const divisor = Number(inputLine.match(/test: divisible by (\d+)/i)[1]);
    inputMonkeys.at(-1).testDivisor = divisor;
  } else if (/throw to monkey/i.test(inputLine)) {
    const [, testOutcome, monkeyNumber] = inputLine.match(/if (true|false): throw to monkey (\d+)/i);
    inputMonkeys.at(-1).throwToMonkey[testOutcome] = monkeyNumber;
  }
});

const leastCommonDivisor = Number(
  inputMonkeys.map((monkey) => monkey.testDivisor).reduce((a, b) => a * b, 1),
);

const processMonkeyTurn = (index, puzzlePart) => {
  const boredomDivisor = 3;

  const monkey = monkeys.at(index);

  [...monkey.items].forEach((item) => {
    monkey.itemsInspected += 1;
    const newItem = puzzlePart === 1
      ? Math.floor(monkey.operation(item) / boredomDivisor)
      : monkey.operation(item) % leastCommonDivisor;
    const testOutcome = newItem % monkey.testDivisor === 0;
    const throwToMonkey = monkey.throwToMonkey[testOutcome];
    monkeys[throwToMonkey].items.push(newItem);
    monkey.items.shift();
  });
};

const getMonkeyBusinessForTwoMostActive = () => monkeys
  .map(({ itemsInspected }) => itemsInspected)
  .sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b, 1);

monkeys = getMonkeysCopy();
for (let i = 0; i < 20; i += 1) {
  monkeys.forEach((_, index) => {
    processMonkeyTurn(index, 1);
  });
}

const part1 = getMonkeyBusinessForTwoMostActive();

monkeys = getMonkeysCopy();
for (let i = 0; i < 10000; i += 1) {
  monkeys.forEach((_, index) => {
    processMonkeyTurn(index, 2);
  });
}

const part2 = getMonkeyBusinessForTwoMostActive();

console.log({
  solution: {
    part1,
    part2,
  },
});
