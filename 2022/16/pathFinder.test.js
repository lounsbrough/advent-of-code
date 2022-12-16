import { findAllPaths, findShortestPaths } from './pathFinder';
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
