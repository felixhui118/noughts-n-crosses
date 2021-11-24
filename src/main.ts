import { BoardState, gameCharacter } from './types';

// You may choose to add new functions and additional modules
export const boardState: BoardState = {
  // complete this enum with all the possible states of a noughts and crosses board (there's more than 3)
  CROSSES_WIN: 'CROSSES_WIN',
  NOUGHTS_WIN: 'NOUGHTS_WIN',
  DRAW: 'DRAW',
  UNFINISHED_GAME: 'UNFINISHED_GAME',
  INVALID_INPUT: 'INVALID_INPUT',
  INVALID_NUMBER_OF_X_n_O: 'INVALID_NUMBER_OF_X_n_O',
  INVALID_BOARD: 'INVALID_BOARD',
};

// Array helper: chunk array to specify size
export const chunk = (arr: string[], size: number): string[][] =>
  arr.reduce(
    (prev, current, index) => (
      index % size ? prev[prev.length - 1].push(current) : prev.push([current]),
      prev
    ),
    [],
  );

// check win Pattern
export const isWin = (boradArr: string[], target: gameCharacter): boolean => {
  return boradArr.every((value) => value === target);
};

// get Patterns from board state
export const getPatterns = (boardArr: string[][]): string[][] => {
  const patterns = [];
  const firstDiagonallySet = [];
  const secondDiagonallySet = [];

  // get horizontally Set and first Diagonally Set
  for (let i = 0; i < 3; i++) {
    patterns.push(boardArr[i]);
    firstDiagonallySet.push(boardArr[i][i]);
  }

  // get vertically Set and second Diagonally Set
  for (let i = 0; i < 3; i++) {
    const tempSet = [];
    for (let j = 0; j < 3; j++) {
      tempSet.push(boardArr[j][i]);
      if (i + j === 2) {
        secondDiagonallySet.push(boardArr[i][j]);
      }
    }
    patterns.push(tempSet);
  }

  // push the Diagonally set to patterns
  patterns.push(firstDiagonallySet);
  patterns.push(secondDiagonallySet);
  return patterns;
};

// calculate winner result;
export const calcWinner = (board: string): string => {
  const boardArr = chunk(board.split(''), 3);
  const countEmpty = (board.match(/_/g) || []).length;
  let countCrossesWin = 0;
  let countNoughtsWin = 0;

  // get all patterns horizontally, vertically and Diagonally from the board
  const patterns = getPatterns(boardArr);

  // loop through the patterns to check each Set of value to be win or not
  patterns.forEach((pattern) => {
    if (isWin(pattern, 'X')) {
      countCrossesWin++;
    } else if (isWin(pattern, 'O')) {
      countNoughtsWin++;
    }
  });

  if (countCrossesWin > countNoughtsWin) return boardState.CROSSES_WIN;
  if (countNoughtsWin > countCrossesWin) return boardState.NOUGHTS_WIN;
  if (
    countNoughtsWin === countCrossesWin &&
    countNoughtsWin > 0 &&
    countCrossesWin > 0
  ) {
    if (!countEmpty) {
      throw boardState.INVALID_BOARD;
    } else if (countEmpty % 2 == 0) {
      return boardState.NOUGHTS_WIN;
    } else {
      return boardState.CROSSES_WIN;
    }
  }

  if (!countEmpty) return boardState.DRAW;

  return boardState.UNFINISHED_GAME;
};

// Board validations
export const validateBoard = (board: string): boolean => {
  // check accpeted characters with "X"  "O" "_" and length should be nine
  const regex = /^[XO_]{9}$/;
  if (!board.match(regex)) {
    throw boardState.INVALID_INPUT;
  }

  // check number of X and O
  const countX = (board.match(/X/g) || []).length;
  const countO = (board.match(/O/g) || []).length;
  if (countO > countX || countX - countO > 1) {
    throw boardState.INVALID_NUMBER_OF_X_n_O;
  }
  return true;
};

export const getStateOfBoard = (board: string) => {
  // complete this method so that it returns the correct board state
  try {
    if (validateBoard(board)) {
      return calcWinner(board);
    }
  } catch (e) {
    return e;
  }
};

// leave this part unchanged
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  console.log(getStateOfBoard(args[i]));
}
