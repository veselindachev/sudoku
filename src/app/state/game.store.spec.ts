// Importing necessary testing utilities from Angular
import { TestBed } from '@angular/core/testing';
// Importing the GameStore service that is being tested
import { GameStore } from './game.store';

// Grouping related tests for GameStore in a test suite
describe('GameStore', () => {
  let store: GameStore; // Declaring a variable to hold the instance of GameStore

  // This block runs before each test in this suite
  beforeEach(() => {
    // Configuring the testing environment; no specific providers needed in this case
    TestBed.configureTestingModule({});
    // Injecting the GameStore service into the test
    store = TestBed.inject(GameStore);
  });

  // Test case: Verifies that a board can be set and retrieved correctly
  it('sets and retrieves the board', () => {
    // Define a sample 2x2 board
    const board = [
      [1, 2],
      [3, 4],
    ];
    // Set the board in the store (casting to 'any' to bypass typing if needed)
    store.setBoard(board as any);
    // Expect the retrieved board to equal the original one
    expect(store.getBoard()).toEqual(board);
  });

  // Test case: Verifies that a single cell in the board can be updated correctly
  it('updates a single cell', () => {
    // Initialize a 2x2 board with all cells set to 0
    const board = [
      [0, 0],
      [0, 0],
    ];
    // Set the initial board in the store
    store.setBoard(board as any);
    // Update the cell at row 0, column 1 to the value 5
    store.updateCell(0, 1, 5);
    // Retrieve the updated board
    const updated = store.getBoard();
    // Expect the specific cell to now hold the updated value
    expect(updated[0][1]).toBe(5);
  });
});
