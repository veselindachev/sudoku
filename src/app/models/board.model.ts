// Define allowed difficulty levels for a Sudoku game.
// 'random' allows for dynamic difficulty selection.
export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';

// Define the type for a Sudoku board: a 9x9 grid of numbers.
// Each row is an array of 9 numbers, forming a 2D array.
export type Board = number[][];

// Interface representing the structure of the board response from the API.
// This is used when fetching a new Sudoku board.
export interface BoardResponse {
  board: Board; // The actual Sudoku board
}

// Interface for a request to solve or validate a Sudoku puzzle.
// Contains the current state of the board.
export interface SudokuRequest {
  board: Board; // The current Sudoku board to be sent to the API
}

// Interface representing the response from the Sudoku solving API.
// Includes the difficulty, the solution, and the solving status.
export interface SolveResponse {
  difficulty: Difficulty; // Difficulty level of the board
  solution: Board; // Solved version of the board
  status: 'solved' | 'broken' | 'unsolvable'; // Result of the solve attempt
}

// Interface representing the response from the Sudoku validation API.
// Indicates whether the board is correctly solved or has errors.
export interface ValidateResponse {
  status: 'solved' | 'unsolved' | 'broken'; // Status of the current board
}
