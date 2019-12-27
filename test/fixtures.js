// [ array, next play, moves]
const winningGames = {
  topRowX: [[
    'X', 'X', null, 
    'O', 'O', null,
    null, null, null], 2],
  topRowO: [[
    'O', 'O', null, 
    'X', 'X', null,
    null, 'X', null], 2],
  midRowO: [[
    'X', 'X', null, 
    'O', 'O', null,
    null, null, 'X'], 5],
  midRowX: [[
    'O', 'O', null, 
    'X', 'X', null,
    null, null, null], 5],
  botRowO: [[
    null, 'X', null,
    'X', 'X', null,
    'O', 'O', null], 8],
  botRowX: [[
    null, null, null,
    'O', 'O', null,
    'X', 'X', null], 8],
  leftColX: [[
    null, 'X', 'O',
    'X', 'O', null,
    'X', 'O', null], 0],
  leftColO: [[
    null, null, 'X',
    'O', 'X', null,
    'O', 'X', null], 0],
  midColX: [[
    'X', null, 'O',
    'O', 'X',  null,
    'O', 'X',  null], 1],
  midColO: [[
    null, null, 'X',
    'X', 'O',  null,
    'X', 'O',  null], 1],
  rightColO: [[
    null, 'X', null,
    'X', null, 'O',
    'X', null, 'O'], 2],
  rightColX: [[
    'X', 'O', null,
    'O', null, 'X',
    'O', null, 'X'], 2],
  diagDownX: [[
    'X', 'O', null,
    'O', null, 'X',
    'O', null, 'X'], 4],
  diagDownO: [[
    'O', 'X', null,
    'X', null, null,
    'X', null, 'O'], 4],
  diagUpO: [[
    'X', null, 'O',
    'X', null, 'X',
    'O', null, null], 4],
  diagUpX: [[
    'O', 'X', 'X',
    null, null, 'O',
    'X', 'O', null], 4],
}

export const wins = Object.keys(winningGames).reduce((acc, scenario) => {
  const [game, insert] = winningGames[scenario];
  const Xs = [];
  const Os = [];
  game.forEach((square, i) => {
    if (square === 'X') {
      Xs.push(i);
    }
    if (square === 'O') {
      Os.push(i);
    }
  })
  const moves = []
  let i = 0;
  const maxI = Xs.length + Os.length;
  while(i < maxI) {
    let add;
    if (i % 2 === 0) {
      add = Xs.splice(Math.floor(Math.random() * Xs.length), 1);
    } else {
      add = Os.splice(Math.floor(Math.random() * Os.length), 1)
    }
    moves.push(add[0])
    i++;
  }
  acc[scenario] = [game, insert, moves];
  return acc;
}, {});