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