// src/app/app.component.ts

import { Component } from '@angular/core';  // Importa el decorador Component para definir componentes Angular
import { RouterOutlet } from '@angular/router';  // Importa RouterOutlet para insertar rutas dinámicas en el template

@Component({
  selector: 'app-root',  // Selector para usar este componente en index.html o en otros templates
  standalone: true,  // Indica que este componente es independiente (standalone)
  imports: [RouterOutlet],  // Importa RouterOutlet para usar en el template
  template: `<router-outlet></router-outlet>`  // Aquí se renderizan los componentes según la ruta activa
})
export class AppComponent {}  // Clase del componente principal, que solo contiene el outlet de rutas
