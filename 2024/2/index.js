import input from './input.js';

const inputLines = input.split('\n').filter(Boolean);

const reports = inputLines.map((inputLine) => inputLine.split(' ').map(Number));

const isReportSafe = (report) => {
  const shift = report[1] > report[0] ? 0 : -4;
  for (let i = 1; i < report.length; i += 1) {
    const diff = report[i] - report[i - 1];
    if (diff < 1 + shift || diff > 3 + shift) {
      return false;
    }
  }

  return true;
};

const part1 = reports.reduce((agg, report) => (isReportSafe(report) ? agg + 1 : agg), 0);

const part2 = reports.reduce((agg, report) => {
  let increasingCount = 0;
  let decreasingCount = 0;
  for (let i = 1; i < report.length; i += 1) {
    if (report[i] > report[i - 1]) {
      increasingCount += 1;
    } else {
      decreasingCount += 1;
    }
  }
  const shift = increasingCount > decreasingCount ? 0 : -4;
  for (let i = 1; i < report.length; i += 1) {
    const diff = report[i] - report[i - 1];
    if (diff < 1 + shift || diff > 3 + shift) {
      const option1 = [...report];
      option1.splice(i, 1);
      const option2 = [...report];
      option2.splice(i - 1, 1);
      if (!isReportSafe(option1) && !isReportSafe(option2)) {
        return agg;
      }
    }
  }

  return agg + 1;
}, 0);

console.log({ solution: { part1, part2 } });
