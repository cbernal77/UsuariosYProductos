
// Importa ApplicationConfig para configurar la aplicación Angular
// Importa funciones para proveer manejo global de errores en el navegador y detección de cambios optimizada con zones
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

// Importa la función para proveer el router con las rutas definidas
import { provideRouter } from '@angular/router';

// Importa las rutas definidas para la aplicación
import { appRoutes } from './app.routes';

// Configuración principal de la aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [  // Proveedores de servicios globales para la aplicación
    provideBrowserGlobalErrorListeners(),  // Provee manejo global de errores del navegador para capturar errores no manejados
    provideZoneChangeDetection({ eventCoalescing: true }),  // Provee detección de cambios optimizada con coalescencia de eventos para mejor rendimiento
    provideRouter(appRoutes)  // Provee el router con las rutas definidas para navegación en la aplicación
  ]
};

