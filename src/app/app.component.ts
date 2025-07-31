import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component';
import { SudokuService } from './services/sudoku.service';
import { Board, Difficulty } from './models/board.model';
import { GameStore } from './state/game.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SudokuBoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));
  solution: Board = [];
  editableCells: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(true)
  );
  difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'random'];
  selectedDifficulty: Difficulty = 'easy';

  timer: number = 0;
  intervalId: any = null;
  statusMessage: string = '';
  isLoading = false;

  constructor(
    private sudokuService: SudokuService,
    private gameStore: GameStore
  ) {}

  ngOnInit(): void {
    this.gameStore.board$.subscribe((board) => {
      this.board = board;
      this.buildEditableMatrix();
    });

    this.loadNewBoard();
  }

  loadNewBoard(): void {
    this.isLoading = true;
    this.sudokuService
      .getBoard(this.selectedDifficulty)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        this.gameStore.setBoard(res.board);
        this.solution = JSON.parse(JSON.stringify(res.board));
        this.buildEditableMatrix();
        this.resetTimer();
        this.startTimer();
        this.statusMessage = '';

        console.log('Loaded board:', res.board);
      });
  }

  buildEditableMatrix(): void {
    this.editableCells = this.board.map((row) => row.map((cell) => cell === 0));
  }

  onCellChanged(event: { row: number; col: number; value: number }): void {
    this.gameStore.updateCell(event.row, event.col, event.value);
  }

  validateBoard(): void {
    const currentBoard = this.gameStore.getBoard();
    this.sudokuService.validateBoard(currentBoard).subscribe((res) => {
      this.statusMessage =
        res.status === 'solved' ? '✅ Correct!' : '❌ Incorrect, keep trying!';
    });
  }

  solveBoard(): void {
    this.sudokuService.solveBoard(this.solution).subscribe((res) => {
      this.gameStore.setBoard(res.solution);
      this.stopTimer();
      this.statusMessage =
        res.status === 'solved'
          ? '✅ Solved automatically'
          : '⚠️ Could not solve the puzzle';
    });
  }

  startTimer(): void {
    this.stopTimer();
    this.intervalId = setInterval(() => this.timer++, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  resetTimer(): void {
    this.stopTimer();
    this.timer = 0;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
