import {
  boardState,
  chunk,
  isWin,
  getPatterns,
  calcWinner,
  validateBoard,
  getStateOfBoard,
} from '../src/main';

describe('Noughts and Crosses', () => {
  // do the validation for the Board states
  describe('validateBoard', () => {
    it('should throw INVALID_INPUT if boardState lenght not equal to 9', () => {
      expect(() => validateBoard('XXO')).toThrow(boardState.INVALID_INPUT);
      expect(() => validateBoard('XXOOOOXXOXXO')).toThrow(
        boardState.INVALID_INPUT,
      );
    });

    it('should throw INVALID_INPUT if there are unaccepted character', () => {
      expect(() => validateBoard('XXOxxoo')).toThrow(boardState.INVALID_INPUT);

      expect(() => validateBoard('XX((&^&')).toThrow(boardState.INVALID_INPUT);

      expect(() => validateBoard('XXXOOO---')).toThrow(
        boardState.INVALID_INPUT,
      );
    });

    it('should throw INVALID_NUMBER_OF_X_n_O if input number of Crosses larger then number of Noughts and the different bigger then one', () => {
      expect(() => validateBoard('XXXXXXXXO')).toThrow(
        boardState.INVALID_NUMBER_OF_X_n_O,
      );
    });

    it('should throw INVALID_NUMBER_OF_X_n_O if input number of Noughts larger then number of Crosses', () => {
      expect(() => validateBoard('OOOOOXXXX')).toThrow(
        boardState.INVALID_NUMBER_OF_X_n_O,
      );
    });

    it('should return true if input lenght equal to 9', () => {
      expect(validateBoard('XXOOXOXXO')).toBe(true);
    });

    it('should return true if number of Noughts larger then number of Crosses and the different not bigger then one', () => {
      expect(validateBoard('XXXXXOOOO')).toBe(true);
    });
  });

  // check for each result set if it is win
  describe('isWin', () => {
    it('should return false if Array with two X, one O and target is X', () => {
      expect(isWin(['X', 'X', 'O'], 'X')).toBe(false);
    });

    it('should return true if Array with three X and target is X', () => {
      expect(isWin(['X', 'X', 'X'], 'X')).toBe(true);
    });

    it('should return false if Array with two X, one O and target is O', () => {
      expect(isWin(['X', 'X', 'O'], 'O')).toBe(false);
    });

    it('should return true if Array with three O and target is O', () => {
      expect(isWin(['O', 'O', 'O'], 'O')).toBe(true);
    });

    it('should return false if Array with two X, one _ and target is X', () => {
      expect(isWin(['X', 'X', '_'], 'X')).toBe(false);
    });
    it('should return false if Array with two O, one _ and target is O', () => {
      expect(isWin(['O', 'O', '_'], 'O')).toBe(false);
    });
  });

  describe('getPatterns', () => {
    const boardState = 'XXXOOXOOX';
    const boardArr = chunk(boardState.split(''), 3);
    const setofResult = getPatterns(boardArr);
    it('return a object and length should be 8', () => {
      expect(typeof setofResult).toBe('object');
      expect(setofResult.length).toEqual(8);
    });
    it('check horizontally Set', () => {
      expect(setofResult[0]).toEqual(['X', 'X', 'X']);
      expect(setofResult[1]).toEqual(['O', 'O', 'X']);
      expect(setofResult[2]).toEqual(['O', 'O', 'X']);
    });
    it('check vertically Set', () => {
      expect(setofResult[3]).toEqual(['X', 'O', 'O']);
      expect(setofResult[4]).toEqual(['X', 'O', 'O']);
      expect(setofResult[5]).toEqual(['X', 'X', 'X']);
    });
    it('check first Diagonally Set', () => {
      expect(setofResult[6]).toEqual(['X', 'O', 'X']);
    });
    it('check second Diagonally Set', () => {
      expect(setofResult[7]).toEqual(['X', 'O', 'O']);
    });
  });

  describe('calcWinner', () => {
    it('should return CROSSES_WIN', () => {
      expect(calcWinner('XXXOOXOOX')).toEqual(boardState.CROSSES_WIN);
      expect(calcWinner('XXXOOO___')).toEqual(boardState.CROSSES_WIN);
    });
    it('should return NOUGHTS_WIN', () => {
      expect(calcWinner('XXOOOOXX_')).toEqual(boardState.NOUGHTS_WIN);
      expect(calcWinner('_OXXOXXOO')).toEqual(boardState.NOUGHTS_WIN);
    });
    it('should return DRAW', () => {
      expect(calcWinner('XXOOOXXOX')).toEqual(boardState.DRAW);
    });
    it('should throw INVALID_BOARD', () => {
      expect(() => calcWinner('XOXXOXXOO')).toThrow(boardState.INVALID_BOARD);
    });
    it('should return UNFINISHED_GAME', () => {
      expect(calcWinner('_________')).toEqual(boardState.UNFINISHED_GAME);
      expect(calcWinner('_XXOO____')).toEqual(boardState.UNFINISHED_GAME);
    });
  });

  describe('getStateOfBoard', () => {
    it('should return INVALID_INPUT', () => {
      expect(getStateOfBoard('XXO')).toEqual(boardState.INVALID_INPUT);
      expect(getStateOfBoard('XXOXXXOOXXO')).toEqual(boardState.INVALID_INPUT);
      expect(getStateOfBoard('XXOxxoo')).toEqual(boardState.INVALID_INPUT);
      expect(getStateOfBoard('XX((&^&')).toEqual(boardState.INVALID_INPUT);
      expect(getStateOfBoard('XXXOOO---')).toEqual(boardState.INVALID_INPUT);
    });
    it('should return INVALID_NUMBER_OF_X_n_O', () => {
      expect(getStateOfBoard('XXXXXXXXO')).toEqual(
        boardState.INVALID_NUMBER_OF_X_n_O,
      );
      expect(getStateOfBoard('OOOOXX___')).toEqual(
        boardState.INVALID_NUMBER_OF_X_n_O,
      );
    });
    it('should return CROSSES_WIN', () => {
      expect(getStateOfBoard('XXXOOXOOX')).toEqual(boardState.CROSSES_WIN);
      expect(getStateOfBoard('XXXOOO___')).toEqual(boardState.CROSSES_WIN);
    });
    it('should return NOUGHTS_WIN', () => {
      expect(getStateOfBoard('XXOOOOX_X')).toEqual(boardState.NOUGHTS_WIN);
    });
    it('should return DRAW', () => {
      expect(getStateOfBoard('XXOOOXXOX')).toEqual(boardState.DRAW);
    });
    it('should return INVALID_BOARD', () => {
      expect(getStateOfBoard('XOXXOXXOO')).toEqual(boardState.INVALID_BOARD);
    });
    it('should return UNFINISHED_GAME', () => {
      expect(getStateOfBoard('_________')).toEqual(boardState.UNFINISHED_GAME);
      expect(getStateOfBoard('___XXOO__')).toEqual(boardState.UNFINISHED_GAME);
      expect(getStateOfBoard('OXXXOXOO_')).toEqual(boardState.UNFINISHED_GAME);
    });
  });
});
