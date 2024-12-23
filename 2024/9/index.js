import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const diskMap = inputLines[0];

const originalBlocks = [];
diskMap.split('').forEach((char, i) => {
  if (i % 2) {
    originalBlocks.push(...Array.from({ length: Number(char) }, () => null));
  } else {
    originalBlocks.push(...Array.from({ length: Number(char) }, () => i / 2));
  }
});

let blocks = [...originalBlocks];
let left = 0;
let right = blocks.length - 1;
while (left < right) {
  if (blocks[right] === null) {
    right -= 1;
    continue;
  }

  if (blocks[left] !== null) {
    left += 1;
    continue;
  }

  blocks[left] = blocks[right];
  blocks[right] = null;
}
const part1 = blocks.reduce((agg, cur, i) => agg + cur * i, 0);

blocks = [...originalBlocks];
const spaces = [];
let activeSpaceCount = 0;
blocks.forEach((char, i) => {
  if (char === null) {
    activeSpaceCount += 1;
  } else if (activeSpaceCount) {
    spaces.push({
      index: i - activeSpaceCount,
      count: activeSpaceCount,
    });
    activeSpaceCount = 0;
  }
});

right = blocks.length;
for (let i = diskMap.length - 1; i >= 0; i -= 1) {
  right -= Number(diskMap[i]);
  if (i % 2 === 0) {
    const diskId = i / 2;
    const blockCount = Number(diskMap[i]);

    const nextAvailableSpace = spaces.find(({ count, index }) => count >= blockCount
      && index < right);

    if (nextAvailableSpace) {
      for (let j = 0; j < blockCount; j += 1) {
        blocks[nextAvailableSpace.index + j] = diskId;
        blocks[right + j] = null;
      }
      nextAvailableSpace.count -= blockCount;
      nextAvailableSpace.index += blockCount;
    }
  }
}
const part2 = blocks.reduce((agg, cur, i) => agg + cur * i, 0);

console.log({ solution: { part1, part2 } });
