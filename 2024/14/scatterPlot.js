// Good thing I already had this lying around!
// https://gist.github.com/lounsbrough/cfd77715f6a42c08fa44848b0c904d01
/* eslint-disable no-restricted-syntax */

/**
 * @param {[{
*  x: number,
*  y: number,
*  symbol: string | undefined
* }]} coordinates
* @param {{
*  defaultSymbol: '*',
*  horizontalSize: 150,
*  verticalSize: 30
* }} options
*/
export const scatterPlot = (coordinates, options = {}) => {
  const { defaultSymbol, horizontalSize, verticalSize } = {
    defaultSymbol: '*',
    horizontalSize: 150,
    verticalSize: 30,
    ...options,
  };

  const pixelHeightToWidthRatio = 2;

  const { xCoordinates, yCoordinates } = coordinates.reduce((result, { x, y }) => {
    result.xCoordinates.push(x * pixelHeightToWidthRatio);
    result.yCoordinates.push(y);

    return result;
  }, {
    xCoordinates: [], yCoordinates: [],
  });

  const minX = Math.min(...xCoordinates);
  const minY = Math.min(...yCoordinates);
  const xDataSpan = Math.max(...xCoordinates) - minX;
  const yDataSpan = Math.max(...yCoordinates) - minY;

  const scaleToStretchX = (horizontalSize - 1) / xDataSpan;
  const scaleToStretchY = (verticalSize - 1) / yDataSpan;
  const effectiveScale = Math.min(scaleToStretchX, scaleToStretchY);

  const pixelMap = Array.from({ length: verticalSize }, () => Array.from({ length: horizontalSize }, () => ' '));

  const halfEmptyXSpace = (horizontalSize - 1 - xDataSpan * effectiveScale) / 2;
  const halfEmptyYSpace = (verticalSize - 1 - yDataSpan * effectiveScale) / 2;

  const offsetX = halfEmptyXSpace - minX * effectiveScale;
  const offsetY = halfEmptyYSpace - minY * effectiveScale;

  for (const [index, { symbol }] of coordinates.entries()) {
    const pixelX = Math.round(xCoordinates[index] * effectiveScale + offsetX);
    const pixelY = Math.round(yCoordinates[index] * effectiveScale + offsetY);

    pixelMap[pixelY][pixelX] = symbol || defaultSymbol;
  }

  console.log([
    `\u250C${Array.from({ length: horizontalSize + 2 }, () => '\u2500').join('')}\u2510`,
    ...pixelMap.reverse().map((row) => `\u2502 ${row.join('')} \u2502`),
    `\u2514${Array.from({ length: horizontalSize + 2 }, () => '\u2500').join('')}\u2518`,
  ].join('\n'));
};
