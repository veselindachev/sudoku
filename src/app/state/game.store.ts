// Importing necessary dependencies from Angular and RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board.model';

// Marks this class as injectable and provided at the root level,
// meaning a single instance will be shared application-wide
@Injectable({ providedIn: 'root' })
export class GameStore {
  // Private BehaviorSubject to hold the current game board state.
  // Initializes with a 9x9 matrix filled with zeroes (empty Sudoku grid).
  private _board$ = new BehaviorSubject<Board>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  // Public observable for components to subscribe to the board state.
  board$ = this._board$.asObservable();

  /**
   * Updates the board with a new one.
   * A deep copy of the incoming board is made to avoid reference issues.
   * @param board A 9x9 matrix representing the Sudoku board
   */
  setBoard(board: Board) {
    this._board$.next(board.map((row) => [...row]));
  }

  /**
   * Updates the value of a specific cell in the board.
   * Creates a new board matrix where only the specified cell is changed.
   * @param row The row index of the cell (0-based)
   * @param col The column index of the cell (0-based)
   * @param value The new value to set in the cell
   */
  updateCell(row: number, col: number, value: number) {
    const updated = this._board$.value.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? value : v))
    );
    this._board$.next(updated);
  }

  /**
   * Returns the current board state as a plain JavaScript array.
   * This is useful for synchronous access (not via observable).
   * @returns The current Sudoku board (9x9 number matrix)
   */
  getBoard(): Board {
    return this._board$.value;
  }
}
