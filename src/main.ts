// Import the bootstrapApplication function from Angular's browser package
// This function is used to bootstrap (start) an Angular standalone application
import { bootstrapApplication } from '@angular/platform-browser';

// Import the root component of the application (AppComponent)
import { AppComponent } from './app/app.component';

// Import importProvidersFrom utility from Angular core
// This allows importing modules (like HttpClientModule) into standalone apps
import { importProvidersFrom } from '@angular/core';

// Import HttpClientModule which is needed for making HTTP requests
import { HttpClientModule } from '@angular/common/http';

// Import the application configuration object
// It typically contains providers and settings used during application bootstrap
import { appConfig } from './app/app.config';

// Bootstrap the Angular application using the root AppComponent and the appConfig
// If an error occurs during bootstrap, log it to the console
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
