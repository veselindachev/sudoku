import { SudokuBoardComponent } from './sudoku-board.component';

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent;

  beforeEach(() => {
    component = new SudokuBoardComponent();
    component.board = [[0]];
  });

  it('emits new value on valid input', () => {
    spyOn(component.cellChanged, 'emit');
    const event = { target: { value: '5' } } as any as Event;
    component.onInputChange(event, 0, 0);
    expect(component.cellChanged.emit).toHaveBeenCalledWith({
      row: 0,
      col: 0,
      value: 5,
    });
  });

  it('emits zero on empty input', () => {
    spyOn(component.cellChanged, 'emit');
    const event = { target: { value: '' } } as any as Event;
    component.onInputChange(event, 0, 0);
    expect(component.cellChanged.emit).toHaveBeenCalledWith({
      row: 0,
      col: 0,
      value: 0,
    });
  });

  it('reverts invalid characters', () => {
    component.board = [[7]];
    const input = document.createElement('input');
    input.value = 'a';
    const event = { target: input } as any as Event;
    component.onInputChange(event, 0, 0);
    expect(input.value).toBe('7');
  });
});