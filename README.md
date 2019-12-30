# gap-ttt
Take Home Assessment for Gap

## Objective

Create a tic-tac-toe game using BDD methodology.  Please see the additional notes about how this was implemented.

## Implementation Notes

 * This was my first time using Enzyme and jsdom and my proficiency with the tools increased as I continued to make progress.  I also took this project as an opportunity to explore the use of React Context and Hooks.  I haven't used those aspects of the latest versions of React but am excited to incorporate the tools.
 * Regarding the Build Tools. I made use of webpack aliases to make import paths simpler.
 * I normally use css modules, but I did't want to take the time to configure that in webpack, so I just used a single scss file.
 * I normally use prop-types, but wanted to focus on writing other tests.  I do have one example in the `<Game >` component tests and would do similar tests for all components, but in the interest of time, I didn't do it this time.
 * And though I hand rolled all the tool configuration, I don't have a ton of experience with webpack config and using environment variables to get a production build.  I will be continuing to add that, but felt this work could be reviewed and run on the dev server.


## Acceptance Criteria

- [x] It must be playable
- [x] It must prompt the user for their turn
- [x] It should determine a winner or tie
- [x] It should allow for rewinding moves
- [x] The game should be resetable from UI
- [x] Styling should be pleasing
- [x] It should be composed of many small components

## Tools Used

- Webpack/Babel
- Mocha/Chai/Enzyme/JSDom
- React
- Lodash

## Folder Structure

```
.
├── componentMocks
│   ├── Consumer.js
│   └── Provider.js
├── fixtures.js
├── gameCombinator.js
└── setup.js

1 directory, 5 files
➜  test git:(master) ✗ cd .. 
➜  gap-ttt git:(master) ✗ man tree
➜  gap-ttt git:(master) ✗ tree -I node_modules
.
├── LICENSE
├── README.md
├── package.json
├── src
│   ├── components
│   │   ├── App
│   │   │   ├── App.js
│   │   │   ├── App.spec.js
│   │   │   └── index.js
│   │   ├── ClearGame
│   │   │   ├── ClearGame.js
│   │   │   ├── ClearGame.spec.js
│   │   │   └── index.js
│   │   ├── Game
│   │   │   ├── Game.js
│   │   │   ├── Game.spec.js
│   │   │   └── index.js
│   │   ├── Move
│   │   │   ├── Move.js
│   │   │   └── index.js
│   │   ├── Prompt
│   │   │   ├── Prompt.js
│   │   │   ├── Prompt.spec.js
│   │   │   └── index.js
│   │   ├── Square
│   │   │   ├── Square.js
│   │   │   ├── Square.spec.js
│   │   │   └── index.js
│   │   └── TimeTravelButton
│   │       ├── TimeTravel.spec.js
│   │       ├── TimeTravelButton.js
│   │       └── index.js
│   ├── constants
│   │   ├── validMessages.js
│   │   └── validOptions.js
│   ├── contexts
│   │   ├── GameContext.js
│   │   └── contexts.spec.js
│   ├── helpers
│   │   ├── calculateWinner.js
│   │   ├── emojify.js
│   │   ├── index.js
│   │   └── promptMap.js
│   ├── index.html
│   ├── index.js
│   ├── index.spec.js
│   └── styles.scss
├── test
│   ├── componentMocks
│   │   ├── Consumer.js
│   │   └── Provider.js
│   ├── fixtures.js
│   ├── gameCombinator.js
│   └── setup.js
├── webpack.config.js
└── yarn.lock

```

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
