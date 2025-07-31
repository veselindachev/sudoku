import { TestBed } from '@angular/core/testing';
import { GameStore } from './game.store';

describe('GameStore', () => {
  let store: GameStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(GameStore);
  });

  it('sets and retrieves the board', () => {
    const board = [
      [1, 2],
      [3, 4],
    ];
    store.setBoard(board as any);
    expect(store.getBoard()).toEqual(board);
  });

  it('updates a single cell', () => {
    const board = [
      [0, 0],
      [0, 0],
    ];
    store.setBoard(board as any);
    store.updateCell(0, 1, 5);
    const updated = store.getBoard();
    expect(updated[0][1]).toBe(5);
  });
});
