// Import necessary Angular core functions and types
import {
  ApplicationConfig, // Interface representing the application's configuration
  provideZoneChangeDetection, // Function to configure how Angular detects changes in the app
  importProvidersFrom, // Helper function to import providers from Angular modules
} from '@angular/core';

// Import HttpClientModule to enable HTTP communication in the application
import { HttpClientModule } from '@angular/common/http';

// Define and export the application configuration
export const appConfig: ApplicationConfig = {
  // The `providers` array registers services and configuration options for the Angular app
  providers: [
    // Enables zone-less change detection with event coalescing to reduce the number of change detection cycles
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Imports all providers from HttpClientModule to make HttpClient available for dependency injection
    importProvidersFrom(HttpClientModule),
  ],
};
