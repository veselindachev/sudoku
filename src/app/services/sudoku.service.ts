import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Board,
  BoardResponse,
  SolveResponse,
  SudokuRequest,
  ValidateResponse,
} from '../models/board.model';

@Injectable({ providedIn: 'root' })
export class SudokuService {
  private readonly API_BASE = 'https://sugoku.onrender.com';

  constructor(private http: HttpClient) {}

  getBoard(difficulty: string = 'random'): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(`${this.API_BASE}/board`, {
      params: new HttpParams().set('difficulty', difficulty),
    });
  }

  validateBoard(board: Board): Observable<ValidateResponse> {
    return this.http.post<ValidateResponse>(
      `${this.API_BASE}/validate`,
      this.encode({ board }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }

  solveBoard(board: Board): Observable<SolveResponse> {
    return this.http.post<SolveResponse>(
      `${this.API_BASE}/solve`,
      this.encode({ board }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }

  private encode(boardData: SudokuRequest): string {
    const encodeBoard = (board: Board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row.join(','))}%5D${
            i === board.length - 1 ? '' : '%2C'
          }`,
        ''
      );

    return `board=%5B${encodeBoard(boardData.board)}%5D`;
  }
}
