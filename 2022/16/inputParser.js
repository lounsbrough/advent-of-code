export const parseInput = (input) => input.split('\n').filter(Boolean).map((inputLine) => {
  const matches = inputLine.match(/valve ([A-Z]*) has flow rate=(\d*); tunnels* leads* to valves* ([A-Z\s,]*)/i);

  return {
    value: matches[1],
    flowRate: Number(matches[2]),
    reachableValves: matches[3].split(', '),
  };
});
