const getValveByValue = (valves, value) => valves.find(({ value: v }) => v === value);

export const findAllPaths = (valves, start, end) => {
  let potentialPaths = getValveByValue(valves, start).reachableValves.map((v) => [start, v]);
  const validPaths = [];
  while (potentialPaths.length) {
    potentialPaths = potentialPaths
      .map((potentialPath) => {
        if (potentialPath.includes(end)) {
          validPaths.push(potentialPath);
          return null;
        }

        const { reachableValves } = getValveByValue(valves, potentialPath.at(-1));
        return reachableValves.map((v) => {
          if (!potentialPath.includes(v)) {
            return [...potentialPath, v];
          }

          return null;
        }).filter(Boolean);
      }).flat().filter(Boolean);
  }

  return validPaths;
};

export const findShortestPaths = (valves, start, end) => {
  const allPaths = findAllPaths(valves, start, end);

  return allPaths.filter((path) => path.length === Math.min(
    ...allPaths.map(({ length }) => length),
  ));
};
