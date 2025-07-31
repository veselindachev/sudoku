import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SudokuBoardComponent is a standalone Angular component
 * responsible for rendering the Sudoku grid and handling user input.
 */
@Component({
  selector: 'app-sudoku-board', // Selector used in parent templates
  standalone: true, // Indicates this is a standalone component
  imports: [CommonModule], // Imports required Angular modules
  templateUrl: './sudoku-board.component.html', // Template file
  styleUrls: ['./sudoku-board.component.scss'], // Style file
})
export class SudokuBoardComponent {
  /**
   * The current Sudoku board.
   * It's a 9x9 matrix of numbers (0 represents empty cells).
   */
  @Input() board: number[][] = [];

  /**
   * A matrix of booleans indicating whether each cell is editable.
   * True means the cell can be changed by the user.
   */
  @Input() editableCells: boolean[][] = [];

  /**
   * Event emitted when the user changes a cell.
   * Emits an object containing row, column, and new value.
   */
  @Output() cellChanged = new EventEmitter<{
    row: number;
    col: number;
    value: number;
  }>();

  /**
   * Handles input changes from the user in the Sudoku grid.
   * - Parses the value as a number between 1 and 9.
   * - Emits the change if valid or empty.
   * - Reverts input if the value is invalid.
   *
   * @param event - DOM event triggered by user input
   * @param row - Row index of the changed cell
   * @param col - Column index of the changed cell
   */
  onInputChange(event: Event, row: number, col: number): void {
    const element = event.target as HTMLInputElement;
    const input = element.value;
    const num = parseInt(input, 10);

    // Valid input: number between 1 and 9
    if (!isNaN(num) && num >= 1 && num <= 9) {
      this.cellChanged.emit({ row, col, value: num });

      // Empty input: clear the cell
    } else if (input === '') {
      this.cellChanged.emit({ row, col, value: 0 });

      // Invalid input: revert to the current value in the board
    } else {
      element.value = this.board[row][col]
        ? this.board[row][col].toString()
        : '';
    }
  }
}
