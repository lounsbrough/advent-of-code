import input from './input';

const binaryNumberLines = input.split('\n').filter(Boolean)
  .map((inputLine) => inputLine.split('').map((n) => parseInt(n, 10)));

const getDecimalFromBits = (bits) => parseInt(bits.join(''), 2);

const getCommonBits = (bitArrays, index) => {
  const indexBits = bitArrays.map((bitArray) => bitArray[index]);

  const zeroCount = indexBits.filter((bit) => bit === 0).length;
  const oneCount = indexBits.filter((bit) => bit === 1).length;

  return oneCount >= zeroCount ? [1, 0] : [0, 1];
};

const gammaRateBits = [];
const epsilonRateBits = [];
let oxygenGeneratorCandidates = [...binaryNumberLines];
let co2ScrubberCandidates = [...binaryNumberLines];
for (let i = 0; i < binaryNumberLines[0].length; i += 1) {
  const [mostCommonBit, leastCommonBit] = getCommonBits(binaryNumberLines, i);

  gammaRateBits.push(mostCommonBit);
  epsilonRateBits.push(leastCommonBit);

  if (oxygenGeneratorCandidates.length > 1) {
    const [mostCommonOxygenBit] = getCommonBits(oxygenGeneratorCandidates, i);
    oxygenGeneratorCandidates = oxygenGeneratorCandidates
      .filter((oxygenGeneratorCandidate) => oxygenGeneratorCandidate[i] === mostCommonOxygenBit);
  }

  if (co2ScrubberCandidates.length > 1) {
    const [, leastCommonCO2Bit] = getCommonBits(co2ScrubberCandidates, i);
    co2ScrubberCandidates = co2ScrubberCandidates
      .filter((co2ScrubberCandidate) => co2ScrubberCandidate[i] === leastCommonCO2Bit);
  }
}

const gammaRate = getDecimalFromBits(gammaRateBits);
const epsilonRate = getDecimalFromBits(epsilonRateBits);
const oxygenGeneratorRate = getDecimalFromBits(oxygenGeneratorCandidates[0]);
const co2ScrubberRate = getDecimalFromBits(co2ScrubberCandidates[0]);

console.log({
  solution: {
    part1: gammaRate * epsilonRate,
    part2: oxygenGeneratorRate * co2ScrubberRate,
  },
});
