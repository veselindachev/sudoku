// Import the component being tested
import { SudokuBoardComponent } from './sudoku-board.component';

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent;

  // Before each test, instantiate the component and initialize a sample board
  beforeEach(() => {
    component = new SudokuBoardComponent();
    component.board = [[0]]; // Initialize a 1x1 board with value 0
  });

  // Test: Should emit new value when valid input is entered
  it('emits new value on valid input', () => {
    // Spy on the 'emit' method of the 'cellChanged' EventEmitter
    spyOn(component.cellChanged, 'emit');

    // Simulate a valid input event with value '5'
    const event = { target: { value: '5' } } as any as Event;

    // Trigger the input change handler
    component.onInputChange(event, 0, 0);

    // Verify that the component emitted the correct event with the parsed value
    expect(component.cellChanged.emit).toHaveBeenCalledWith({
      row: 0,
      col: 0,
      value: 5,
    });
  });

  // Test: Should emit value 0 when input is empty (cleared)
  it('emits zero on empty input', () => {
    // Spy on the 'emit' method
    spyOn(component.cellChanged, 'emit');

    // Simulate an input event with an empty string
    const event = { target: { value: '' } } as any as Event;

    // Trigger the input change handler
    component.onInputChange(event, 0, 0);

    // Ensure the component emits 0 for empty input
    expect(component.cellChanged.emit).toHaveBeenCalledWith({
      row: 0,
      col: 0,
      value: 0,
    });
  });

  // Test: Should revert the input field to the previous valid value on invalid character
  it('reverts invalid characters', () => {
    // Set an initial valid board value
    component.board = [[7]];

    // Create a mock input element and assign an invalid value
    const input = document.createElement('input');
    input.value = 'a';

    // Simulate the input event
    const event = { target: input } as any as Event;

    // Trigger the input change handler
    component.onInputChange(event, 0, 0);

    // Verify that the invalid input was reverted back to the previous value (7)
    expect(input.value).toBe('7');
  });
});
