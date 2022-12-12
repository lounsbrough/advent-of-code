import input from './input';

const alphabetGrid = input.split('\n').filter(Boolean).map((inputLine) => inputLine.split(''));

const startHeight = 1;
const endHeight = 26;

const isInRange = (x, [min, max]) => x >= min && x <= max;

const letterToHeight = (letter) => {
  if (letter === 'S') {
    return startHeight;
  }

  if (letter === 'E') {
    return endHeight;
  }

  return letter.charCodeAt() - 96;
};

const heightGrid = alphabetGrid.map((alphabetGridLine) => alphabetGridLine.map(letterToHeight));

const startLineIndex = alphabetGrid.findIndex((alphabetGridLine) => alphabetGridLine
  .some((letter) => letter === 'S'));
const endLineIndex = alphabetGrid.findIndex((alphabetGridLine) => alphabetGridLine
  .some((letter) => letter === 'E'));

const startPosition = [
  alphabetGrid[startLineIndex].findIndex((letter) => letter === 'S'),
  startLineIndex,
];

const endPosition = [
  alphabetGrid[endLineIndex].findIndex((letter) => letter === 'E'),
  endLineIndex,
];

const aPositions = [];
alphabetGrid.forEach((alphabetGridLine, y) => {
  alphabetGridLine.forEach((letter, x) => {
    if (letter === 'a') {
      aPositions.push([x, y]);
    }
  });
});

let pathBranches;
let currentPathBranches;
let newPathsFound;
let pathsThatReachedEnd;
let visitedPositions;

const getPossibleNextSteps = (branchIndex) => {
  const currentBranch = currentPathBranches[branchIndex];

  const [lastX, lastY] = currentBranch.steps.at(-1);

  return [
    [lastX, lastY - 1], [lastX, lastY + 1], [lastX - 1, lastY], [lastX + 1, lastY],
  ].filter(([nextX, nextY]) => !visitedPositions
    .some(([prevX, prevY]) => prevX === nextX && prevY === nextY)
    && isInRange(nextX, [0, heightGrid[0].length - 1])
    && isInRange(nextY, [0, heightGrid.length - 1])
    && heightGrid[nextY][nextX] <= heightGrid[lastY][lastX] + 1);
};

const getNextBranches = (branchIndex) => {
  const currentBranch = currentPathBranches[branchIndex];

  const possibleNextSteps = getPossibleNextSteps(branchIndex);

  if (!possibleNextSteps.length) {
    return;
  }

  newPathsFound = true;

  const newBranches = [];
  possibleNextSteps.forEach((possibleNextStep) => {
    visitedPositions.push(possibleNextStep);
    const reachedEnd = possibleNextStep[0] === endPosition[0]
      && possibleNextStep[1] === endPosition[1];
    if (reachedEnd) {
      pathsThatReachedEnd.push({ steps: [...currentBranch.steps, possibleNextStep] });
    } else {
      newBranches.push({ steps: [...currentBranch.steps, possibleNextStep] });
    }
  });

  pathBranches.push(...newBranches);
};

pathBranches = [{ steps: [startPosition] }];
newPathsFound = true;
pathsThatReachedEnd = [];
visitedPositions = [];
while (newPathsFound) {
  currentPathBranches = [...pathBranches];
  pathBranches = [];
  newPathsFound = false;
  currentPathBranches.forEach((_, branchIndex) => getNextBranches(branchIndex));
}

const minimumStepsToEndFromS = pathsThatReachedEnd
  .sort((a, b) => a.steps.length - b.steps.length)[0].steps.length - 1;

let minimumStepsToEndFromAnyA = Infinity;
aPositions.forEach((aPosition) => {
  pathBranches = [{ steps: [aPosition] }];
  newPathsFound = true;
  pathsThatReachedEnd = [];
  visitedPositions = [];
  while (newPathsFound) {
    currentPathBranches = [...pathBranches];
    pathBranches = [];
    newPathsFound = false;
    currentPathBranches.forEach((_, branchIndex) => getNextBranches(branchIndex));
  }
  const shortestPathToEndFromA = pathsThatReachedEnd
    .sort((a, b) => a.steps.length - b.steps.length)[0];

  if (shortestPathToEndFromA) {
    minimumStepsToEndFromAnyA = Math.min(
      minimumStepsToEndFromAnyA,
      shortestPathToEndFromA.steps.length - 1,
    );
  }
});

console.log({
  solution: {
    part1: { minimumStepsToEndFromS },
    part2: { minimumStepsToEndFromAnyA },
  },
});
