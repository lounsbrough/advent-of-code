/* eslint-disable no-restricted-syntax */
import input from './input.js';

const [ruleLines, updateLines] = input.split('\n\n').map((lines) => lines.split('\n').filter(Boolean));

const rules = ruleLines.map((ruleLine) => ruleLine.split('|').map(Number));
const updates = updateLines.map((updateLine) => updateLine.split(',').map(Number));

const prerequisitePages = {};

rules.forEach(([first, second]) => {
  if (!prerequisitePages[second]) {
    prerequisitePages[second] = new Set();
  }
  prerequisitePages[second].add(first);
});

let part1 = 0;
const unorderedUpdates = [];
updates.forEach((update) => {
  const printed = new Set();
  if (update.every((page) => {
    let valid = true;
    if (prerequisitePages[page]) {
      valid = [...prerequisitePages[page]].every((prereq) => printed.has(prereq)
        || !update.some((p) => p === prereq));
    }
    printed.add(page);
    return valid;
  })) {
    part1 += update[Math.floor(update.length / 2)];
  } else {
    unorderedUpdates.push(update);
  }
});

const orderUpdate = (update) => {
  const printed = new Set();
  for (const [index, page] of update.entries()) {
    if (prerequisitePages[page]) {
      const missingPrereq = [...prerequisitePages[page]].find((prereq) => !printed.has(prereq)
        && update.some((p) => p === prereq));
      if (missingPrereq) {
        const prereqIndex = update.findIndex((p) => p === missingPrereq);
        const prereqMovedForward = [
          ...update.slice(0, index),
          missingPrereq,
          page,
          ...update.slice(index + 1, prereqIndex),
          ...update.slice(prereqIndex + 1),
        ];
        return orderUpdate(prereqMovedForward);
      }
    }
    printed.add(page);
  }
  return update;
};

let part2 = 0;
unorderedUpdates.forEach((update) => {
  const orderedUpdate = orderUpdate(update);
  part2 += orderedUpdate[Math.floor(orderedUpdate.length / 2)];
});

console.log({ solution: { part1, part2 } });
