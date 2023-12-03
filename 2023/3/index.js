import input from "./input.js";

const inputLines = input.split('\n').filter(Boolean);

const parsedLines = inputLines.map((line) => {
    const matches = line.matchAll(/(\d+)/gm);

    return [...matches].map((match) => ({
        index: match['index'],
        digitCount: match[0].length,
        number: Number(match[0])
    }));
});

let sum = 0;
parsedLines.forEach((parsedLine, lineIndex) => {
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
            sum += number;
        }
    });
});

console.log(sum);
