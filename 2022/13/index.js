/* eslint-disable no-continue */
import input from './input';

const packetPairs = input.split('\n\n')
  .map((inputLinePair) => inputLinePair.split('\n').filter(Boolean).map(JSON.parse));

const isPacketPairOutOfOrder = ([firstPacket, secondPacket]) => {
  for (let i = 0; i < Math.max(firstPacket.length, secondPacket.length); i += 1) {
    let firstPacketValue = firstPacket[i];
    let secondPacketValue = secondPacket[i];

    const firstValueMissing = typeof firstPacketValue === 'undefined';
    const secondValueMissing = typeof secondPacketValue === 'undefined';

    if (firstValueMissing && !secondValueMissing) {
      return false;
    }

    if (secondValueMissing && !firstValueMissing) {
      return true;
    }

    if (!Array.isArray(firstPacketValue) && !Array.isArray(secondPacketValue)) {
      if (firstPacketValue !== secondPacketValue) {
        return firstPacketValue > secondPacketValue;
      }

      continue;
    }

    if (!Array.isArray(firstPacketValue)) {
      firstPacketValue = !firstValueMissing ? [firstPacketValue] : [];
    }

    if (!Array.isArray(secondPacketValue)) {
      secondPacketValue = !secondValueMissing ? [secondPacketValue] : [];
    }

    if (!firstPacketValue.length && secondPacketValue.length) {
      return false;
    }

    if (!secondPacketValue.length && firstPacketValue.length) {
      return true;
    }

    const nestedResult = isPacketPairOutOfOrder([firstPacketValue, secondPacketValue]);
    if (nestedResult !== null) {
      return nestedResult;
    }
  }

  return null;
};

const packetsPairsOutOfOrder = packetPairs
  .map((packetPair) => isPacketPairOutOfOrder(packetPair) || false);

console.log({
  solution: {
    part1: packetsPairsOutOfOrder
      .reduce((sum, outOfOrder, i) => (outOfOrder ? sum : sum + i + 1), 0),
  },
});
