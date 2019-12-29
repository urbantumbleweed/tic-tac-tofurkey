import { validMessages } from '../components/App/App.constants';

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

