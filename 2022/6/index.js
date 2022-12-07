import input from './input';

const chars = input.split('');

const getCharCountToDetectFirstMarker = (markerLength) => {
  for (let i = 0; i < chars.length - markerLength; i += 1) {
    const segment = chars.slice(i, i + markerLength);
    if (new Set(segment).size === markerLength) {
      return i + markerLength;
    }
  }

  return null;
};

console.log({
  solution: {
    part1: getCharCountToDetectFirstMarker(4),
    part2: getCharCountToDetectFirstMarker(14),
  },
});
