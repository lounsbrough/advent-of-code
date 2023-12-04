import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const parsedCards = inputLines.map((line) => {
  const winningNumberMatch = line.match(/.+: (.+) \|/);
  const myNumberMatch = line.match(/.+\| (.+)/);

  const winningNumbers = winningNumberMatch[1]
    .split(' ').filter(Boolean).map(Number);
  const myNumbers = myNumberMatch[1]
    .split(' ').filter(Boolean).map(Number);

  const myWinningNumbers = myNumbers.filter((myNumber) =>
    winningNumbers.some((winningNumber) => myNumber === winningNumber));

  const cardScore = myWinningNumbers.length
    ? Math.pow(2, myWinningNumbers.length - 1)
    : 0;

  return {
    winningNumbers,
    myNumbers,
    myWinningNumbers,
    cardScore,
    copyCount: 1
  }
});

parsedCards.forEach(({ myWinningNumbers }, index) => {
  const copiesOfCurrentCard = parsedCards[index].copyCount;
  for (let copyIndex = index + 1; copyIndex <= index + myWinningNumbers.length; copyIndex++) {
    if (parsedCards[copyIndex]) parsedCards[copyIndex].copyCount += copiesOfCurrentCard;
  }
});

console.log({
  solution: {
    part1: parsedCards.reduce((agg, { cardScore }) => agg + cardScore, 0),
    part2: parsedCards.reduce((agg, { copyCount }) => agg + copyCount, 0)
  }
});
