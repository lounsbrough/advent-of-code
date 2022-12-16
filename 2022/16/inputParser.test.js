import { parseInput } from './inputParser';
import input from './demo';

it('should parse vavles correctly from input', () => {
  const expectedValves = [
    { value: 'AA', flowRate: 0, reachableValves: ['DD', 'II', 'BB'] },
    { value: 'BB', flowRate: 13, reachableValves: ['CC', 'AA'] },
    { value: 'CC', flowRate: 2, reachableValves: ['DD', 'BB'] },
    { value: 'DD', flowRate: 20, reachableValves: ['CC', 'AA', 'EE'] },
    { value: 'EE', flowRate: 3, reachableValves: ['FF', 'DD'] },
    { value: 'FF', flowRate: 0, reachableValves: ['EE', 'GG'] },
    { value: 'GG', flowRate: 0, reachableValves: ['FF', 'HH'] },
    { value: 'HH', flowRate: 22, reachableValves: ['GG'] },
    { value: 'II', flowRate: 0, reachableValves: ['AA', 'JJ'] },
    { value: 'JJ', flowRate: 21, reachableValves: ['II'] },
  ];

  expect(parseInput(input)).toEqual(expectedValves);
});
