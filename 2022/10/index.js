import input from './input';

const inputLines = input.split('\n').filter(Boolean);

let currentSpritePosition = 1;
let currentCycle = 0;
const spritePositions = [];
const crtLines = [];

const isInRange = (x, [min, max]) => x >= min && x <= max;

const outputToCrt = () => {
  const currentPixel = currentCycle % 40;

  if (currentPixel === 0) {
    crtLines.push([]);
  }

  const spriteBounds = [currentSpritePosition - 1, currentSpritePosition + 1]
    .map((bound) => Math.max(0, Math.min(39, bound)));

  crtLines.at(-1).push(isInRange(currentPixel, spriteBounds) ? '#' : '.');
};

const processCycle = () => {
  spritePositions.push(currentSpritePosition);
  outputToCrt();
  currentCycle += 1;
};

const runNoop = () => {
  processCycle();
};

const runAddX = (n) => {
  processCycle();
  processCycle();
  currentSpritePosition += n;
};

inputLines.forEach((inputLine) => {
  const addXMatch = inputLine.match(/addx ([-\d]*)/i);
  if (addXMatch) {
    runAddX(Number(addXMatch[1]));
  } else {
    runNoop();
  }
});

const signalStrenths = spritePositions
  .map((spritePosition, cycleIndex) => (cycleIndex + 1) * spritePosition);

console.log({
  solution: {
    part1: {
      signalStrenths: signalStrenths
        .filter((_, index) => [20, 60, 100, 140, 180, 220].includes(index + 1))
        .reduce((a, b) => a + b, 0),
    },
    part2: { crtOutput: `\n${crtLines.map((crtLine) => crtLine.join('')).join('\n')}\n` },
  },
});
