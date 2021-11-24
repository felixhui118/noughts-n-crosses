// define the BoardState interface
export interface BoardState {
  CROSSES_WIN: string;
  NOUGHTS_WIN: string;
  DRAW: string;
  UNFINISHED_GAME: string;
  INVALID_INPUT: string;
  INVALID_NUMBER_OF_X_n_O: string;
  INVALID_BOARD: string;
}

// define the gameCharacter type
export type gameCharacter = 'X' | 'O';
