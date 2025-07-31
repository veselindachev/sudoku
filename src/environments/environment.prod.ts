// This file defines environment-specific configuration variables for the Angular application.
// It is typically used to separate development and production settings.

// The `environment` constant is exported so it can be imported and used throughout the app.
export const environment = {
  // Indicates that this configuration is for the production build.
  // Angular replaces `environment.ts` with `environment.prod.ts` during the production build process.
  production: true,

  // The base URL of the API that the application communicates with.
  // In this case, it's the Sugoku Sudoku puzzle API hosted on Render.
  apiBase: 'https://sugoku.onrender.com',
};
