import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // This provides change detection without Zone.js
    provideExperimentalZonelessChangeDetection(), 
    provideRouter(routes)]
};
