export function calculateWinner(game) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  for(var i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (game[a] && game[a] === game[b] && game[a] === game[c]) {
      return game[a];
    }
  }
  return null;
}

export default calculateWinner;