import input from './demo';

const alphabetGrid = input.split('\n').filter(Boolean).map((inputLine) => inputLine.split(''));

const startHeight = 0;
const endHeight = 27;

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

console.log(heightGrid);

const startLineIndex = heightGrid.findIndex((heightGridLine) => heightGridLine
  .some((height) => height === startHeight));
const endLineIndex = heightGrid.findIndex((heightGridLine) => heightGridLine
  .some((height) => height === endHeight));

const startPosition = [
  heightGrid[startLineIndex].findIndex((height) => height === startHeight),
  startLineIndex,
];

const endPosition = [
  heightGrid[endLineIndex].findIndex((height) => height === endHeight),
  endLineIndex,
];

let pathBranches = [{
  steps: [startPosition], reachedEnd: false, looped: false, deadEnd: false,
}];
let currentPathBranches;

const getNextBranches = (branchIndex) => {
  const possibleNextSteps = [[1, 0], [0, 1]];

  // dead end? !possibleNextSteps.length

  const newBranches = [];
  possibleNextSteps.forEach((possibleNextStep) => {
    // reached end? possibleNextStep is endPosition
    // looped? possibleNextStep already exists in array
    newBranches.push({ steps: [...currentPathBranches[branchIndex].steps, possibleNextStep] });
  });

  pathBranches.push(...newBranches);
};

console.log(JSON.stringify(pathBranches));
currentPathBranches = [...pathBranches];
pathBranches = [];
getNextBranches(0);
console.log(JSON.stringify(pathBranches));
currentPathBranches = [...pathBranches];
pathBranches = [];
getNextBranches(0);
getNextBranches(1);
console.log(JSON.stringify(pathBranches));
