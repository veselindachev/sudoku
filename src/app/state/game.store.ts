import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({ providedIn: 'root' })
export class GameStore {
  private _board$ = new BehaviorSubject<Board>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  board$ = this._board$.asObservable();

  setBoard(board: Board) {
    this._board$.next(board.map((row) => [...row]));
  }

  updateCell(row: number, col: number, value: number) {
    const updated = this._board$.value.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? value : v))
    );
    this._board$.next(updated);
  }

  getBoard(): Board {
    return this._board$.value;
  }
}
