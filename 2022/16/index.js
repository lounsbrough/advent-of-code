import input from './demo';
import { parseInput } from './inputParser';
import { findNextTarget } from './pathFinder';

const valves = parseInput(input);

let minutesRemaining = 30;
let totalPressureRelieved = 0;
let currentTargetValve;
let arrivedAtTarget = false;
let currentPosition = 'AA';
while (minutesRemaining > 0) {
  const openValves = valves.filter(({ opened }) => opened);
  totalPressureRelieved += openValves.reduce((total, { flowRate }) => total + flowRate, 0);

  if (arrivedAtTarget) {
    valves.find(({ value }) => value === currentTargetValve.value).opened = true;
    arrivedAtTarget = false;
    currentTargetValve = false;
  } else {
    if (!currentTargetValve) {
      currentTargetValve = findNextTarget(valves, currentPosition, minutesRemaining);
      console.log(currentTargetValve);
    }

    if (currentTargetValve) {
      const nextStepIndex = currentTargetValve.shortestPath
        .findIndex((value) => value === currentPosition) + 1;

      console.log(nextStepIndex);

      currentPosition = currentTargetValve.shortestPath[nextStepIndex];
      if (nextStepIndex === currentTargetValve.shortestPath.length - 1) {
        arrivedAtTarget = true;
      }
    }
  }

  minutesRemaining -= 1;
}

console.log(totalPressureRelieved);
