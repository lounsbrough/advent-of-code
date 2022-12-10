import input from "./input";

const inputLines = input.split('\n').filter(Boolean);

const isInRange = (x, [min, max]) => x >= min && x <= max;

const outputToCrt = () => {
    if (currentCycle % 40 === 0) {
        crtLines.push([]);
    }

    const spriteBounds = [currentSpritePosition - 1, currentSpritePosition + 1]
        .map((bound) => Math.max(0, Math.min(39, bound)));

    const doesSpriteOverlap = isInRange(currentCycle % 40, spriteBounds)

    crtLines.at(-1).push(doesSpriteOverlap ? '#' : '.');
};

const processCycle = () => {
    spritePositions.push(currentSpritePosition);
    outputToCrt();
    currentCycle += 1;
}

const runNoop = () => {
    processCycle();
};

const runAddX = (n) => {
    processCycle();
    processCycle();
    currentSpritePosition += n;
}

let spritePositions = [];
let currentSpritePosition = 1;
let currentCycle = 0;
const crtLines = [];
inputLines.forEach((inputLine) => {
    const addXMatch = inputLine.match(/addx ([-\d]*)/i);
    if (addXMatch) {
        runAddX(parseInt(addXMatch[1], 10));
    } else {
        runNoop();
    }
});

const signalStrenths = spritePositions.map((spritePosition, cycleIndex) => (cycleIndex + 1) * spritePosition);

console.log({
    solution: {
        part1: {
            signalStrenths: signalStrenths
                .filter((_, index) => [20, 60, 100, 140, 180, 220].includes(index + 1))
                .reduce((a, b) => a + b, 0)
        },
        part2: { crtOutput: `\n${crtLines.map((crtLine) => crtLine.join('')).join('\n')}\n` },
    }
})