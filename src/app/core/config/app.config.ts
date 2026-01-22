import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AuthStateService } from '../services/auth-state.service';
import { firstValueFrom } from 'rxjs';

// Función para inicializar la autenticación antes de arrancar la app
function initializeAuth(authState: AuthStateService) {
  return () => firstValueFrom(authState.checkAuthStatus());
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // Inicializar autenticación antes de arrancar la app
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthStateService],
      multi: true
    },
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    })
  ]
};
