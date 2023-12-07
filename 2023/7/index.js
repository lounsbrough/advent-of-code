import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const cardRanksPart1 = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, T: 9, J: 10, Q: 11, K: 12, A: 13 };
const cardRanksPart2 = { ...cardRanksPart1, J: 0 };
const handTypeRanks = {
  highCard: 1,
  onePair: 2,
  twoPair: 3,
  threeOfAKind: 4,
  fullHouse: 5,
  fourOfAKind: 6,
  fiveOfAKind: 7,
};

const getCardsCounts = (cards) =>
  cards.split('').reduce((agg, cur) => ({
    ...agg,
    [cur]: (agg[cur] ?? 0) + 1
  }), {});

const getHandType = (cards) => {
  const cardCounts = getCardsCounts(cards);

  const uniqueCardCount = Object.keys(cardCounts).length;

  if (uniqueCardCount === 1) {
    return handTypeRanks.fiveOfAKind;
  }

  if (uniqueCardCount === 2) {
    if (Object.values(cardCounts).some((v) => v === 4)) {
      return handTypeRanks.fourOfAKind;
    }
    return handTypeRanks.fullHouse;
  }

  if (uniqueCardCount === 3) {
    if (Object.values(cardCounts).some((v) => v === 3)) {
      return handTypeRanks.threeOfAKind;
    }
    return handTypeRanks.twoPair;
  }

  if (uniqueCardCount === 4) {
    return handTypeRanks.onePair;
  }

  return handTypeRanks.highCard;
};

const compareHands = (cardRanks, type) => (hand1, hand2) => {
  if (hand1[type] === hand2[type]) {
    for (let i = 0; i <= 4; i++) {
      if (hand1.cards[i] !== hand2.cards[i]) {
        return cardRanks[hand1.cards[i]] - cardRanks[hand2.cards[i]];
      }
    }
  }

  return hand1[type] - hand2[type];
};

const getMostCommonNonJokerCard = (cards) => {
  const cardCounts = getCardsCounts(cards);
  let highestCount = 0, mostCommonNonJokerCard = 'A';
  for (const [key, value] of Object.entries(cardCounts)) {
    if (key !== 'J' && value > highestCount) {
      mostCommonNonJokerCard = key;
      highestCount = value;
    }
  }
  return mostCommonNonJokerCard;
};

const hands = inputLines.map((line) => {
  const cards = line.substring(0, 5);

  return ({
    cards,
    type1: getHandType(cards),
    type2: getHandType(cards.replaceAll('J', getMostCommonNonJokerCard(cards))),
    bid: Number(line.substring(6))
  });
});

const getTotalWinnings = (sortFunction) =>
  hands.sort(sortFunction).reduce((agg, { bid }, i) => agg + bid * (i + 1), 0);

console.log({
  solution: {
    part1: getTotalWinnings(compareHands(cardRanksPart1, 'type1')),
    part2: getTotalWinnings(compareHands(cardRanksPart2, 'type2'))
  }
});
