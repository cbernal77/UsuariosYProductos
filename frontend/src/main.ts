// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser'; // Importa la función para arrancar la app standalone
import { AppComponent } from './app/app.component';               // Importa el componente raíz de la aplicación
import { provideRouter } from '@angular/router';                   // Importa el proveedor para configurar las rutas
import { appRoutes } from './app/app.routes';                      // Importa la configuración de rutas
import { provideHttpClient } from '@angular/common/http';          // Importa el proveedor para habilitar HttpClient

// Arranca la aplicación Angular con el componente raíz y configuración adicional
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),   // Proporciona las rutas configuradas para la navegación
    provideHttpClient()         // Habilita el servicio HttpClient para hacer peticiones HTTP
  ]
});
