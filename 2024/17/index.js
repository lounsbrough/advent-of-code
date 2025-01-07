/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const registers = [
  BigInt(inputLines[0].slice(12)),
  BigInt(inputLines[1].slice(12)),
  BigInt(inputLines[2].slice(12)),
];
const program = inputLines[3].slice(9).split(',').map(BigInt);

const runProgram = (registerA, registerB, registerC) => {
  const getComboOperand = (operand) => {
    if (operand >= 0n && operand <= 3n) {
      return operand;
    }
    if (operand === 4n) {
      return registerA;
    }
    if (operand === 5n) {
      return registerB;
    }
    if (operand === 6n) {
      return registerC;
    }
    throw new Error('Unexpected operand');
  };

  let instructionPointer = 0n;
  const outputs = [];
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1n];

    if (opcode === 3n) {
      if (registerA === 0n) {
        instructionPointer += 2n;
      } else {
        instructionPointer = operand;
      }
    } else {
      if (opcode === 0n) {
        registerA /= (2n ** getComboOperand(operand));
      } else if (opcode === 1n) {
        registerB ^= operand;
      } else if (opcode === 2n) {
        registerB = getComboOperand(operand) % 8n;
      } else if (opcode === 4n) {
        registerB ^= registerC;
      } else if (opcode === 5n) {
        outputs.push(getComboOperand(operand) % 8n);
      } else if (opcode === 6n) {
        registerB = registerA / (2n ** getComboOperand(operand));
      } else if (opcode === 7n) {
        registerC = registerA / (2n ** getComboOperand(operand));
      }

      instructionPointer += 2n;
    }
  }

  return outputs;
};

const part1 = runProgram(registers[0], registers[1], registers[2]).join(',');

const expectedOutput = program.join(',');
function findRegisterA(current, tail) {
  for (let modSize = 0n; modSize < 8n; modSize += 1n) {
    const next = current * 8n + modSize;

    const outputs = runProgram(next, registers[1], registers[2]);

    if (program.at(-tail) !== outputs.at(-tail)) {
      continue;
    }

    if (expectedOutput === outputs.join(',')) {
      return next;
    }

    const final = findRegisterA(next, tail + 1);

    if (final !== 0) {
      return final;
    }
  }

  return 0;
}

const part2 = findRegisterA(0n, 1);

console.log({ solution: { part1, part2 } });
