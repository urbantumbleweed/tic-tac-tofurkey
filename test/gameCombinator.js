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