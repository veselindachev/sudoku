// This file defines environment-specific configuration values for the Angular application.
// The settings here are used during development mode and can be replaced at build time
// with production-specific values using the Angular file replacement mechanism.

/**
 * `environment` is an object that holds configuration values used throughout the application.
 * These values can vary depending on the build environment (development or production).
 */
export const environment = {
  /**
   * `production` indicates whether the application is running in production mode.
   * Set to `false` during development for easier debugging and unminified error messages.
   */
  production: false,

  /**
   * `apiBase` is the base URL of the external API used by the application.
   * In this case, it's set to Sugoku's Sudoku-solving API hosted on Render.
   */
  apiBase: 'https://sugoku.onrender.com',
};
