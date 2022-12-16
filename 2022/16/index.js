import input from './demo';
import { parseInput } from './inputParser';
import { findAllPaths } from './pathFinder';

const valves = parseInput(input);

console.log(findAllPaths(valves, 'AA', 'EE'));
