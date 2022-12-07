import input from './input';

const inputLines = input.split('\n').filter(Boolean);

const strategicMoves = inputLines.map((inputLine) => inputLine.split(' '));

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const WIN = 'WIN';
const DRAW = 'DRAW';
const LOSE = 'LOSE';

const RULES = {
  [ROCK]: {
    BEATS: SCISSORS,
    LOSES: PAPER,
  },
  [PAPER]: {
    BEATS: ROCK,
    LOSES: SCISSORS,
  },
  [SCISSORS]: {
    BEATS: PAPER,
    LOSES: ROCK,
  },
};

const getShapeForLetter = (letter) => ({
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
}[letter]);

const getRequiredOutcomeForLetter = (letter) => ({
  X: LOSE,
  Y: DRAW,
  Z: WIN,
}[letter]);

const getScoreForShapePlayed = (shape) => ({
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
}[shape]);

const getScoreForOutcome = (outcome) => ({
  [WIN]: 6,
  [DRAW]: 3,
  [LOSE]: 0,
}[outcome]);

const getOutcomeForRound = (yourShape, opponentShape) => {
  if (yourShape === opponentShape) {
    return DRAW;
  }

  return RULES[yourShape].BEATS === opponentShape ? WIN : LOSE;
};

const getRequiredShapeForOutcome = (opponentShape, outcome) => {
  if (outcome === DRAW) {
    return opponentShape;
  }

  return outcome === WIN ? RULES[opponentShape].LOSES : RULES[opponentShape].BEATS;
};

const scoresForFirstInterpretation = strategicMoves
  .map(([opponentLetter, yourLetter]) => {
    const yourShape = getShapeForLetter(yourLetter);
    const opponentShape = getShapeForLetter(opponentLetter);
    const roundOutcome = getOutcomeForRound(yourShape, opponentShape);
    return getScoreForShapePlayed(yourShape) + getScoreForOutcome(roundOutcome);
  });

const scoresForSecondInterpretation = strategicMoves
  .map(([opponentLetter, requiredOutcomeLetter]) => {
    const opponentShape = getShapeForLetter(opponentLetter);
    const requiredOutcome = getRequiredOutcomeForLetter(requiredOutcomeLetter);
    const requiredShape = getRequiredShapeForOutcome(opponentShape, requiredOutcome);
    return getScoreForShapePlayed(requiredShape) + getScoreForOutcome(requiredOutcome);
  });

console.log({
  solution: {
    part1: scoresForFirstInterpretation.reduce((a, b) => a + b),
    part2: scoresForSecondInterpretation.reduce((a, b) => a + b),
  },
});
