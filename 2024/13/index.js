import input from './input.js';

const machineInputs = input.split('\n\n').map((l) => l.trim());

const machines = machineInputs.map((machineInput) => {
  const [buttonA, buttonB, prize] = machineInput.split('\n');

  const buttonAMatches = [...buttonA.matchAll(/X([+-\d]+), Y([+-\d]+)/g)][0];
  const buttonBMatches = [...buttonB.matchAll(/X([+-\d]+), Y([+-\d]+)/g)][0];
  const prizeMatches = [...prize.matchAll(/X=([+-\d]+), Y=([+-\d]+)/g)][0];

  return {
    A: { x: BigInt(buttonAMatches[1]), y: BigInt(buttonAMatches[2]) },
    B: { x: BigInt(buttonBMatches[1]), y: BigInt(buttonBMatches[2]) },
    prize1: { x: BigInt(prizeMatches[1]), y: BigInt(prizeMatches[2]) },
    prize2: {
      x: BigInt(prizeMatches[1]) + 10000000000000n, y: BigInt(prizeMatches[2]) + 10000000000000n,
    },
  };
});

function solveClawMachine(machine, prizeKey) {
  const Ax = machine.A.x;
  const Ay = machine.A.y;
  const Bx = machine.B.x;
  const By = machine.B.y;
  const Px = machine[prizeKey].x;
  const Py = machine[prizeKey].y;

  // I couldn't get this simple equation method working because of numeric precision issues
  // const A = (Py / Ay - (By * Px) / (Bx * Ay)) / (1 - (By * Ax) / (Bx * Ay));
  // const B = Px / Bx - (Ax * A) / Bx;

  // Instead, I used Cramer's rule to simplify the equations
  // https://artofproblemsolving.com/wiki/index.php/Cramer%27s_Rule
  const determinant = Number(Ax * By - Ay * Bx);
  if (determinant === 0n) {
    return 0;
  }
  const A = Number(Px * By - Py * Bx) / determinant;
  const B = Number(Py * Ax - Px * Ay) / determinant;

  return Number.isInteger(A) && Number.isInteger(B) ? 3 * A + B : 0;
}

const part1 = machines.reduce((totalCost, machine) => totalCost + solveClawMachine(machine, 'prize1'), 0);
const part2 = machines.reduce((totalCost, machine) => totalCost + solveClawMachine(machine, 'prize2'), 0);

console.log({ solution: { part1, part2 } });
