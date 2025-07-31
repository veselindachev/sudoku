import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SudokuService } from './sudoku.service';
import {
  BoardResponse,
  SolveResponse,
  ValidateResponse,
} from '../models/board.model';

describe('SudokuService', () => {
  let service: SudokuService;
  let http: HttpTestingController;
  const API_BASE = 'https://sugoku.onrender.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SudokuService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('requests a new board', () => {
    const mock: BoardResponse = { board: [[0]] };
    service.getBoard('easy').subscribe((res) => {
      expect(res).toEqual(mock);
    });
    const req = http.expectOne(`${API_BASE}/board?difficulty=easy`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('validates a board', () => {
    const board = [
      [1, 2],
      [3, 4],
    ] as any;
    const mock: ValidateResponse = { status: 'solved' };
    service.validateBoard(board).subscribe((res) => {
      expect(res).toEqual(mock);
    });
    const req = http.expectOne(`${API_BASE}/validate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe('board=%5B%5B1%2C2%5D%2C%5B3%2C4%5D%5D');
    req.flush(mock);
  });

  it('solves a board', () => {
    const board = [
      [1, 2],
      [3, 4],
    ] as any;
    const mock: SolveResponse = {
      difficulty: 'easy',
      solution: board,
      status: 'solved',
    };
    service.solveBoard(board).subscribe((res) => {
      expect(res).toEqual(mock);
    });
    const req = http.expectOne(`${API_BASE}/solve`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe('board=%5B%5B1%2C2%5D%2C%5B3%2C4%5D%5D');
    req.flush(mock);
  });
});
