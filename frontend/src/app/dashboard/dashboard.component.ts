
// Importa Component y OnInit desde Angular core.
import { Component, OnInit } from '@angular/core';

// Importa Router para manejar navegación de rutas y RouterModule para poder usar directivas de enrutamiento en la plantilla.
import { Router, RouterModule } from '@angular/router';

// Importa CommonModule para tener acceso a directivas básicas como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',              // Nombre del selector del componente.
  standalone: true,                       // Declara que este componente es standalone (no necesita un módulo).
  imports: [CommonModule, RouterModule],  // Módulos que el componente necesita para la plantilla.
  templateUrl: './dashboard.component.html',  // Archivo de plantilla HTML asociado.
  styleUrls: ['./dashboard.component.css']    // Archivo de estilos CSS (si existe).
})
export class DashboardComponent implements OnInit {
  // Propiedades públicas para mostrar el nombre y el rol del usuario.
  nombre = '';
  rol = '';

  // Inyección del servicio Router para redirecciones.
  constructor(private router: Router) {}

  // Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
  ngOnInit(): void {
    // Obtiene el objeto 'usuario' del localStorage.
    const usuario = localStorage.getItem('usuario');

    // Si existe el usuario, lo convierte de string a objeto y asigna sus datos.
    if (usuario) {
      const parsed = JSON.parse(usuario);  // Parsea el JSON guardado.
      this.nombre = parsed.nombre;         // Asigna el nombre del usuario.
      this.rol = parsed.rol;               // Asigna el rol del usuario.
    }
  }

  // Método para cerrar sesión.
  logout(): void {
    // Elimina el token y los datos del usuario del almacenamiento local.
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // Redirige al usuario a la pantalla de bienvenida.
    this.router.navigate(['/welcome']);
  }
}

