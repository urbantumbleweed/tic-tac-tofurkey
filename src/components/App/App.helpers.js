import { validMessages } from './App.constants';

export function promptMap(moves, winner = null) {
  switch (true) {
    case ('X wins', winner === 'X'):
      return validMessages[2];
    case ('O wins', winner === 'O'):
      return validMessages[3];
    case ('X turn', moves < 9 && moves % 2 === 0):
      return validMessages[0];
    case ('O Turn', moves < 9 && moves % 2 === 1):
      return validMessages[1];
    case ('Tie', moves === 9 && !winner):
      return validMessages[4];
    default:
      return '';
  }
}

export function calculateWinner(game) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for(var i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (game[a] && game[a] === game[b] && game[a] === game[c]) {
      return game[a];
    }
  }
  return null;
}