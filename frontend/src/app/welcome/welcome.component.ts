
import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente Angular
import { RouterModule } from '@angular/router'; // Importa RouterModule para usar directivas de rutas (como routerLink)
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes (ngIf, ngFor, etc.)

@Component({
  selector: 'app-welcome', // Define el selector que se usará en el HTML para incluir este componente
  standalone: true, // Indica que es un componente independiente (no requiere módulo Angular)
  imports: [RouterModule, CommonModule], // Módulos que se importan para uso dentro de este componente
  templateUrl: './welcome.component.html', // Ruta al archivo HTML que contiene la plantilla del componente
  styleUrls: ['./welcome.component.css'] // Ruta al archivo CSS con los estilos del componente
})
export class WelcomeComponent {} // Clase vacía del componente, ya que no tiene lógica adicional

