# gap-ttt
Take Home Assessment for Gap

## Objective

Create a tic-tac-toe game using BDD methodology

## Acceptance Criteria

- [ ] It must be playable
- [ ] It must prompt the user for their turn
- [ ] It should determine a winner or tie
- [ ] It should allow for rewinding moves
- [ ] The game should be resetable from UI
- [ ] Styling should be pleasing
- [ ] It should be composed of many small components

## Tools Used

- Webpack/Babel
- Mocha/Chai/Enzyme/JSDom
- React

## Feature List

1. `<App />` component mounts at the DOM element with an `id` of `app`
1. `<App />` renders a 'Time Travel'button that when clicked enables `timeTravel`
1. `<App />` has state with `history` that is an `Array` of `game` arrays
1. `<App />` initializes `history` with one array of `null`s
1. `<App />` has state with `timeTravel` that is a `Boolean`
1. `<App />` has a method `toggleTimeTravel` that toggles `timeTravel`
1. `<App />` has a method `goTo` that takes a history `integer` and reverts to that game state
1. `<App />` renders a 'Clear Board' button that when clicked resets the `history` to the first item
1. `<App />` renders a `<Game />`
1. `<Game />` renders nine `<Square />` elements in a 3 x 3 grid
1. `<Game />` renders a `<Prompt />` that displays a `message`
1. `message` will be a prompt for next move, declare a winner, or declare a tie
1. `<Game />` accepts the current state as `game` which is as an `Array`
1. `game` is an Array composed of `X`s, `O`s, and `null`s
1. `<Square />` is a component that has a `value` prop that is either `X`, `O`, or `null`
1. `<Square />` accepts a an `onClick` that changes the game state for the `game[i]` square for the `<Square />`
1. `<Square />` has a `onHover` state that displays a semi-transparent `X` or `O` if the square is playable
1. `<Square />` accepts a prop called `move` that exists when `value` is either `X` or `O`.
1. `move` is an integer indicating the move when the `<Square />` was assigned a value
1. `<Square />` renders a `<Move />` that displays an integer when `timeTravel` is enabled
1. `<Move />` accepts an `onClick` that reverts the game to a state where the square is cleared.
