// Import Angular and RxJS dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import custom types from the model
import {
  Board,
  BoardResponse,
  SolveResponse,
  SudokuRequest,
  ValidateResponse,
} from '../models/board.model';

// Import the environment configuration
import { environment } from '../../environments/environment';

// Mark the class as injectable and provided in root-level scope
@Injectable({ providedIn: 'root' })
export class SudokuService {
  // Base URL for the Sudoku API, configured via environment settings
  private readonly API_BASE = environment.apiBase;

  // Inject HttpClient for performing HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Fetches a new Sudoku board from the API.
   * @param difficulty - Difficulty level of the board (default is 'random')
   * @returns Observable with the BoardResponse from the API
   */
  getBoard(difficulty: string = 'random'): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${this.API_BASE}/board`, {
      params: new HttpParams().set('difficulty', difficulty),
    });
  }

  /**
   * Validates a given Sudoku board by sending it to the API.
   * @param board - The current board to validate
   * @returns Observable with the validation response
   */
  validateBoard(board: Board): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(
      `${this.API_BASE}/validate`,
      this.encode({ board }), // Encodes the board into URL-encoded format
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }

  /**
   * Sends a Sudoku board to the API to get the solved version.
   * @param board - The board to solve
   * @returns Observable with the solved board response
   */
  solveBoard(board: Board): Observable<SolveResponse> {
    return this.http.post<SolveResponse>(
      `${this.API_BASE}/solve`,
      this.encode({ board }), // Encodes the board into URL-encoded format
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }

  /**
   * Encodes a Sudoku board to a URL-encoded string compatible with the API.
   * Format: board=%5B[...rows...]%5D where each row is URL encoded.
   * @param boardData - An object containing the board
   * @returns URL-encoded string to be used in the POST body
   */
  private encode(boardData: SudokuRequest): string {
    // Helper function to encode each row of the board
    const encodeBoard = (board: Board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row.join(','))}%5D${
            i === board.length - 1 ? '' : '%2C' // Add comma between rows
          }`,
        ''
      );

    // Return the full encoded board string
    return `board=%5B${encodeBoard(boardData.board)}%5D`;
  }
}
