const LENGTH = 9;

export default function gameCombinator(length = LENGTH) {
  const combinations = [];
  const options = [null, 'X', 'O'];
  function makeCombination(combination) {
    // base case - length of combination is 9
    if (combination.length === LENGTH) {
      // before we use a combination
      // ensure that it is valid
      // we start by counting the X's and O's 
      let { x, o } = combination.reduce((c, move) => {
        if (move === 'X') {
          c.x = c.x + 1;
        } else if (move === 'O') {
          c.o = c.o + 1;
        }
        return c;
      }, { x: 0, o: 0 })
      // not all permutations are valid
      // only items that have balanced values of X's and O's
      // specifically, if there is the same number of X's and O's
      // or there is one more X than there are O's
      if (x - o <= 1 && x - o >= 0) {
        combinations.push(combination.slice());
      }
      return;
    }
    if (combination.length < 9) {
      options.forEach((option) => {
        // add the value
        combination.push(option);
        // call makeCombination on grown list
        makeCombination(combination)
        // remove the added value
        combination.pop();
      })
    }
  }
  makeCombination([]);
  return combinations;
}

function calculateWinner(game) {
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

function isSparse(game) {
  const length = game.reduce((c, v) => ['X', 'O'].includes(v) ? c + 1 : c, 0)
  return length === 9 ? false : true;
}

export function gamesByType(games) {
  return games.reduce( (dict, game) => {
    const winner = calculateWinner(game);
    const sparse = isSparse(game);

    switch(true) {
      case  winner === 'X' && sparse:
        dict.sparseX.push(game);
        break;
      case winner === 'O' && sparse:
        dict.sparseO.push(game);
        break;
      case  winner === 'X' && !sparse:
        dict.completeX.push(game);
        break;
      case winner === 'O' && !sparse:
        dict.completeO.push(game);
        break;
      case winner === null && !sparse:
        dict.completeTie.push(game);
        break;
      case winner === null && sparse:
        dict.sparseTie.push(game);
        break;
    }
    return dict;
  }, {
    completeX: [],
    completeO: [],
    sparseX: [],
    sparseO: [],
    sparseTie: [],
    completeTie: [],
  })
}

export const gameTypes = gamesByType(gameCombinator())