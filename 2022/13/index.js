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

const dividerPackets = [[[2]], [[6]]];
const allPacketsPlusDividers = [...packetPairs.flat(), ...dividerPackets];

let packetsNeedShifting = true;
while (packetsNeedShifting) {
  packetsNeedShifting = false;

  for (let i = 0; i < allPacketsPlusDividers.length - 1; i += 1) {
    const [firstPacket, secondPacket] = allPacketsPlusDividers.slice(i, i + 2);

    const isOutOfOrder = isPacketPairOutOfOrder([firstPacket, secondPacket]);

    if (isOutOfOrder) {
      allPacketsPlusDividers[i] = secondPacket;
      allPacketsPlusDividers[i + 1] = firstPacket;
      packetsNeedShifting = true;
    }
  }
}

const sumOfCorrectPackets = packetsPairsOutOfOrder
  .reduce((sum, outOfOrder, i) => (outOfOrder ? sum : sum + i + 1), 0);

const decoderKey = allPacketsPlusDividers
  .reduce((product, packet, index) => (dividerPackets
    .map(JSON.stringify).includes(JSON.stringify(packet)) ? product * (index + 1) : product), 1);

console.log({
  solution: {
    part1: { sumOfCorrectPackets },
    part2: { decoderKey },
  },
});
