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

  return outputs.join(',');
};

const part1 = runProgram(registers[0], registers[1], registers[2]);

const expectedOutput = program.join(',');
let currentA = 0n;
while (runProgram(currentA, registers[1], registers[2]) !== expectedOutput) {
  currentA += 1n;
}

const part2 = currentA;

console.log({ solution: { part1, part2 } });
