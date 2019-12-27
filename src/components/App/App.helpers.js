import { validMessages } from './App.constants';

export function promptMap(moves, winner = null) {
  switch (true) {
    case ('X turn', moves < 9 && moves % 2 === 0):
      return validMessages[0];
    case ('O Turn', moves < 9 && moves % 2 === 1):
      return validMessages[1];
    default:
      return '';
  }
}

export function calculateWinner(game) {
  const wins = [
    [0, 1, 2]
  ];
  for(var i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (game[a] === game[b] && game[b] === game[c]) {
      return game[a];
    }
  }
  return null;
}