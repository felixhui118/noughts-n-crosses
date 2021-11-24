# Noughts and Crosses

## Game Rules

- Crosses always goes first
- Players must make a move during their turn in one of the empty slots
- The game ends as soon as either player gets 3 in a row, or there are no empty slots left
- The character ”X” is used for Crosses, ”O” (letter O) for Noughts, and ”\_” for empty slots

## Getting Started

- Run `npm install` to install the package
- To run the test by `npm test`
- run `npm run build` before running the application
- To run the application by `npm start`
- For example: run `npm start XXXOO____` then get `CROSSES_WIN`

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
