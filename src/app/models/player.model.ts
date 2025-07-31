/**
 * Interface representing a player in the game.
 *
 * This interface defines the structure for player-related data,
 * such as the player's name and how many cells they've filled in the game.
 */
export interface Player {
  /**
   * The name of the player.
   * This is used to identify the player in single-player or multiplayer modes.
   */
  name: string;

  /**
   * The number of Sudoku cells this player has filled correctly.
   * This can be used for tracking progress, determining the winner in multiplayer,
   * or for score/statistics purposes.
   */
  cellsFilled: number;
}
