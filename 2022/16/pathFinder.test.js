import { findAllPaths, findNextTarget, findShortestPaths } from './pathFinder';
import input from './demo';
import { parseInput } from './inputParser';

const valves = parseInput(input);

it('should find all paths from AA to EE', () => {
  expect(findAllPaths(valves, 'AA', 'EE')).toEqual([
    ['AA', 'DD', 'EE'], ['AA', 'BB', 'CC', 'DD', 'EE'],
  ]);
});

it('should find shortest path from EE to BB', () => {
  expect(findShortestPaths(valves, 'EE', 'BB')).toEqual([
    ['EE', 'DD', 'CC', 'BB'],
    ['EE', 'DD', 'AA', 'BB'],
  ]);
});

it('should find shortest path from AA to JJ', () => {
  expect(findShortestPaths(valves, 'AA', 'JJ')).toEqual([
    ['AA', 'II', 'JJ'],
  ]);
});

it('should find next target based on maximum potential flow', () => {
  expect(findNextTarget(valves, 'AA', 30)).toEqual({
    value: 'DD',
    flowRate: 20,
    reachableValves: ['CC', 'AA', 'EE'],
    opened: false,
    potentialFlow: 560,
    shortestPath: ['AA', 'DD'],
  });
});
