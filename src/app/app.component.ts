// Import Angular core and common modules
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

// Import custom components and services
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component';
import { SudokuService } from './services/sudoku.service';
import { Board, Difficulty } from './models/board.model';
import { Player } from './models/player.model';
import { GameStore } from './state/game.store';

@Component({
  selector: 'app-root', // Root component selector
  standalone: true, // Standalone component (no NgModule needed)
  imports: [CommonModule, FormsModule, SudokuBoardComponent], // Imported modules and components
  templateUrl: './app.component.html', // HTML template
  styleUrls: ['./app.component.scss'], // SCSS styles
})
export class AppComponent implements OnInit {
  // Game board data
  board: Board = Array.from({ length: 9 }, () => Array(9).fill(0)); // 9x9 grid initialized with zeros
  solution: Board = []; // Stores the solved version of the board
  editableCells: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(true)
  ); // Matrix to track which cells are editable

  // Multiplayer mode
  multiplayer = false; // Flag for multiplayer mode
  players: Player[] = [
    { name: 'Player 1', cellsFilled: 0 },
    { name: 'Player 2', cellsFilled: 0 },
  ]; // Array of player objects
  currentPlayerIndex = 0; // Index of the current player

  // Difficulty settings
  difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'random']; // Available difficulties
  selectedDifficulty: Difficulty = 'easy'; // Currently selected difficulty

  // Timer and UI state
  timer: number = 0; // Timer value in seconds
  intervalId: ReturnType<typeof setInterval> | null = null; // Timer interval ID
  statusMessage: string = ''; // Feedback/status message shown to the user
  isLoading = false; // Loading flag for async operations

  constructor(
    private sudokuService: SudokuService, // Sudoku API service
    private gameStore: GameStore // Game state management service
  ) {}

  // Lifecycle hook - runs on component initialization
  ngOnInit(): void {
    // Subscribe to board state updates from the store
    this.gameStore.board$.subscribe((board) => {
      this.board = board;
      this.buildEditableMatrix(); // Update editable matrix based on board
    });

    this.loadNewBoard(); // Load initial board on startup
  }

  // Loads a new board from the API and updates all related states
  loadNewBoard(): void {
    this.isLoading = true;
    this.sudokuService
      .getBoard(this.selectedDifficulty)
      .pipe(finalize(() => (this.isLoading = false))) // Stop loading spinner when done
      .subscribe((res) => {
        this.gameStore.setBoard(res.board); // Save the new board to the store
        this.solution = JSON.parse(JSON.stringify(res.board)); // Deep copy of board for solution
        this.buildEditableMatrix(); // Determine editable cells
        this.resetPlayers(); // Reset multiplayer stats
        this.resetTimer(); // Reset timer
        this.startTimer(); // Start new timer
        this.statusMessage = ''; // Clear status message

        console.log('Loaded board:', res.board); // Debug log
      });
  }

  // Builds the matrix that defines which cells can be edited by the user
  buildEditableMatrix(): void {
    this.editableCells = this.board.map((row) => row.map((cell) => cell === 0));
  }

  // Called when a cell value is changed in the UI
  onCellChanged(event: { row: number; col: number; value: number }): void {
    const previous = this.board[event.row][event.col]; // Get previous value
    this.gameStore.updateCell(event.row, event.col, event.value); // Update board state
    if (this.multiplayer) {
      // If multiplayer, track filled cells and switch player
      if (previous === 0 && event.value !== 0) {
        this.players[this.currentPlayerIndex].cellsFilled++;
      }
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }
  }

  // Sends the board to the backend to check if it's solved correctly
  validateBoard(): void {
    const currentBoard = this.gameStore.getBoard();
    this.sudokuService.validateBoard(currentBoard).subscribe((res) => {
      this.statusMessage =
        res.status === 'solved' ? '✅ Correct!' : '❌ Incorrect, keep trying!';
      if (res.status === 'solved') {
        this.stopTimer(); // Stop timer if solved
      }
    });
  }

  // Sends the current board for solving by the backend
  solveBoard(): void {
    this.sudokuService.solveBoard(this.solution).subscribe((res) => {
      this.gameStore.setBoard(res.solution); // Set solved board
      this.editableCells = this.board.map((row) => row.map(() => false)); // Disable editing
      this.stopTimer(); // Stop timer
      this.statusMessage =
        res.status === 'solved'
          ? '✅ Solved automatically'
          : '⚠️ Could not solve the puzzle';
    });
  }

  // Starts the game timer
  startTimer(): void {
    this.stopTimer(); // Ensure no duplicate intervals
    this.intervalId = setInterval(() => this.timer++, 1000); // Tick every second
  }

  // Stops the game timer
  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Resets the game timer to 0
  resetTimer(): void {
    this.stopTimer();
    this.timer = 0;
  }

  // Resets player stats and current player index
  resetPlayers(): void {
    this.players.forEach((p) => (p.cellsFilled = 0));
    this.currentPlayerIndex = 0;
  }

  // Called when multiplayer toggle is switched
  onMultiplayerToggle(): void {
    this.resetPlayers();
  }

  // Returns the timer in mm:ss format for UI display
  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
