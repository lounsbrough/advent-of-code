import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const input = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), './input.txt'), 'utf8');

const part1 = [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
  .reduce((agg, [, n1, n2]) => agg + Number(n1) * Number(n2), 0);

const part2 = ([...input.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)]
  .reduce((agg, [match, n1, n2]) => {
    if (match === 'do()') {
      return { ...agg, enabled: true };
    }
    if (match === 'don\'t()') {
      return { ...agg, enabled: false };
    }
    if (agg.enabled) {
      return { ...agg, sum: agg.sum + Number(n1) * Number(n2) };
    }
    return agg;
  }, { enabled: true, sum: 0 })).sum;

console.log({ solution: { part1, part2 } });
