import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const linesOfNumbers = inputLines.map((line) => {
    const matches = line.matchAll(/(\d+)/gm);

    return [...matches].map((match) => ({
        index: match['index'],
        digitCount: match[0].length,
        number: Number(match[0])
    }));
});

let part1 = 0;
linesOfNumbers.forEach((parsedLine, lineIndex) => {
    parsedLine.forEach(({index, digitCount, number}) => {
        const leftBoundary = index - 1;
        const rightBoundary = index + digitCount;
        const topBoundary = lineIndex - 1;
        const bottomBoundary = lineIndex + 1;

        let touchingSymbol = false;
        for (let row = topBoundary; row <= bottomBoundary; row++) {
            for (let col = leftBoundary; col <= rightBoundary; col++) {
                if (inputLines[row]?.[col] && !/[\d\.]/.test(inputLines[row]?.[col])) {
                    touchingSymbol = true;
                }
            }
        }

        if (touchingSymbol) {
            part1 += number;
        }
    });
});

let part2 = 0;
inputLines.forEach((inputLines, lineIndex) => {
    const matches = inputLines.matchAll(/(\*{1})/gm);

    [...matches].forEach((match) => {
        const leftIndex = match['index'] - 1;
        const rightIndex = match['index'] + 1;
        const touchingNumbers = [
            ...linesOfNumbers[lineIndex - 1],
            ...linesOfNumbers[lineIndex],
            ...linesOfNumbers[lineIndex + 1]
        ].filter(({index, digitCount}) =>
            (index >= leftIndex && index <= rightIndex)
            || (index + digitCount - 1 >= leftIndex && index + digitCount - 1 <= rightIndex))

        if (touchingNumbers.length === 2) {
            part2 += touchingNumbers[0].number * touchingNumbers[1].number
        }
    });
});

console.log({
    soution: {
        part1,
        part2
    }
});
