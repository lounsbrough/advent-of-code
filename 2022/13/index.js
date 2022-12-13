/* eslint-disable no-continue */
import input from './input';

const packetPairs = input.split('\n\n')
  .map((inputLinePair) => inputLinePair.split('\n').filter(Boolean).map(JSON.parse));

packetPairs.forEach((packetPair) => console.log(JSON.stringify(packetPair)));

const isPacketPairOutOfOrder = ([firstPacket, secondPacket]) => {
  for (let i = 0; i < Math.max(firstPacket.length, secondPacket.length); i += 1) {
    let firstPacketValue = firstPacket[i];
    let secondPacketValue = secondPacket[i];
    // console.log(`Compare ${firstPacketValue} vs ${secondPacketValue}`);
    if (!Array.isArray(firstPacketValue) && !Array.isArray(secondPacketValue)) {
      if (typeof firstPacketValue === 'undefined') {
        // console.log('missing first number', firstPacketValue, secondPacketValue);
        return false;
      }

      if (typeof secondPacketValue === 'undefined') {
        // console.log('missing second number', firstPacketValue, secondPacketValue);
        return true;
      }

      if (firstPacketValue !== secondPacketValue) {
        // console.log('numbers are different', firstPacketValue, secondPacketValue);
        return firstPacketValue > secondPacketValue;
      }

      continue;
    }

    if (!Array.isArray(firstPacketValue)) {
      firstPacketValue = firstPacketValue ? [firstPacketValue] : [];
    }

    if (!Array.isArray(secondPacketValue)) {
      secondPacketValue = secondPacketValue ? [secondPacketValue] : [];
    }

    if (!firstPacketValue.length) {
      return false;
    }

    if (!secondPacketValue.length) {
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
  .map((packetPair) => {
    // console.log('new packet pair');

    const result = isPacketPairOutOfOrder(packetPair) || false;

    // console.log('is out of order', result);

    return result;
  });

console.log('packetsPairsOutOfOrder', packetsPairsOutOfOrder);

console.log({
  solution: {
    part1: packetsPairsOutOfOrder
      .reduce((sum, outOfOrder, i) => (outOfOrder ? sum : sum + i + 1), 0),
  },
});
