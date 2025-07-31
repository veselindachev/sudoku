// Import necessary testing utilities from Angular
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// Import the Sudoku service to be tested
import { SudokuService } from './sudoku.service';

// Import interfaces for type checking API responses
import {
  BoardResponse,
  SolveResponse,
  ValidateResponse,
} from '../models/board.model';

// Define the test suite for the SudokuService
describe('SudokuService', () => {
  let service: SudokuService; // The instance of the service under test
  let http: HttpTestingController; // Used to mock HTTP requests
  const API_BASE = 'https://sugoku.onrender.com'; // Base URL for the external API

  // Set up the testing module before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide the HTTP client testing module
    });

    // Inject the service and the HTTP mock controller
    service = TestBed.inject(SudokuService);
    http = TestBed.inject(HttpTestingController);
  });

  // Verify that no unmatched requests are pending after each test
  afterEach(() => {
    http.verify();
  });

  // Test the "getBoard" method
  it('requests a new board', () => {
    const mock: BoardResponse = { board: [[0]] }; // Mock response from the API

    // Call the service method and expect the result to match the mock
    service.getBoard('easy').subscribe((res) => {
      expect(res).toEqual(mock);
    });

    // Expect a GET request to the correct API endpoint
    const req = http.expectOne(`${API_BASE}/board?difficulty=easy`);
    expect(req.request.method).toBe('GET');

    // Simulate the server responding with the mock data
    req.flush(mock);
  });

  // Test the "validateBoard" method
  it('validates a board', () => {
    const board = [
      [1, 2],
      [3, 4],
    ] as any; // Sample board to validate

    const mock: ValidateResponse = { status: 'solved' }; // Mock API response

    // Call the service method and verify the result
    service.validateBoard(board).subscribe((res) => {
      expect(res).toEqual(mock);
    });

    // Expect a POST request to the validation endpoint
    const req = http.expectOne(`${API_BASE}/validate`);
    expect(req.request.method).toBe('POST');

    // Check that the request body is correctly encoded
    expect(req.request.body).toBe('board=%5B%5B1%2C2%5D%2C%5B3%2C4%5D%5D');

    // Respond with the mock data
    req.flush(mock);
  });

  // Test the "solveBoard" method
  it('solves a board', () => {
    const board = [
      [1, 2],
      [3, 4],
    ] as any; // Sample board to solve

    const mock: SolveResponse = {
      difficulty: 'easy',
      solution: board,
      status: 'solved',
    }; // Mock solution from the API

    // Call the service method and verify the result
    service.solveBoard(board).subscribe((res) => {
      expect(res).toEqual(mock);
    });

    // Expect a POST request to the solve endpoint
    const req = http.expectOne(`${API_BASE}/solve`);
    expect(req.request.method).toBe('POST');

    // Ensure the request body is correctly encoded
    expect(req.request.body).toBe('board=%5B%5B1%2C2%5D%2C%5B3%2C4%5D%5D');

    // Respond with the mock data
    req.flush(mock);
  });
});
