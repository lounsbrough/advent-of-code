import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const codes = inputLines[0].split(',');

const getStringHash = (string) => {
  let hash = 0;
  string.split('').forEach((c) => {
    hash = ((hash + c.charCodeAt(0)) * 17) % 256;
  });
  return hash;
};

const part1 = codes.map(getStringHash).reduce((agg, cur) => agg + cur, 0);

const operations = codes.map((code) => {
  if (code.includes('-')) {
    return { type: '-', label: code.slice(0, -1) };
  }

  const [label, focalLength] = code.split('=');
  return { type: '=', label, focalLength };
});

const boxes = Object.fromEntries(Array.from({ length: 256 }, (_, i) => ([i, new Map()])));

operations.forEach(({ type, label, focalLength }) => {
  const box = boxes[getStringHash(label)];
  if (type === '-') {
    box.delete(label);
  } else {
    box.set(label, focalLength);
  }
});

const getBoxFocusingPower = (n) => [...boxes[n].entries()].reduce(
  (agg, [, focalLength], slot) => agg + (n + 1) * (slot + 1) * focalLength,
  0,
);

const part2 = Object.keys(boxes)
  .map((n) => getBoxFocusingPower(Number(n)))
  .reduce((agg, cur) => agg + cur, 0);

console.log({ solution: { part1, part2 } });
