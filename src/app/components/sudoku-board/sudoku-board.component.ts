import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sudoku-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss'],
})
export class SudokuBoardComponent {
  @Input() board: number[][] = [];
  @Input() editableCells: boolean[][] = [];
  @Output() cellChanged = new EventEmitter<{
    row: number;
    col: number;
    value: number;
  }>();

  onInputChange(event: Event, row: number, col: number): void {
    const element = event.target as HTMLInputElement;
    const input = element.value;
    const num = parseInt(input, 10);
    if (!isNaN(num) && num >= 1 && num <= 9) {
      this.cellChanged.emit({ row, col, value: num });
    } else if (input === '') {
      this.cellChanged.emit({ row, col, value: 0 });
    } else {
      // Revert invalid characters so the view stays in sync with the board
      element.value = this.board[row][col]
        ? this.board[row][col].toString()
        : '';
    }
  }
}
