// src/app/auth/auth.component.ts

// Importa el decorador Component de Angular para definir un componente.
import { Component } from '@angular/core';
// Importa CommonModule para usar directivas comunes de Angular (como *ngIf, *ngFor).
import { CommonModule } from '@angular/common';
// Importa FormsModule para poder usar [(ngModel)] en el formulario.
import { FormsModule } from '@angular/forms';
// Importa Router para navegar entre rutas de la aplicación.
import { Router } from '@angular/router';
// Importa el servicio de autenticación creado anteriormente.
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth', // Nombre del selector que se usará en HTML para este componente.
  standalone: true,     // Indica que este componente es independiente y no depende de un módulo externo.
  imports: [CommonModule, FormsModule], // Módulos que se importan para poder usar funcionalidades básicas y formularios.
  templateUrl: './auth.component.html', // Ruta al archivo HTML asociado al componente.
  styleUrls: ['./auth.component.css']   // Ruta al archivo de estilos CSS para este componente.
})
export class AuthComponent {
  // Propiedades del formulario de inicio de sesión.
  correo = '';           // Campo para el correo electrónico.
  contrasena = '';       // Campo para la contraseña.
  successMessage = '';   // Mensaje de éxito mostrado al usuario.
  errorMessage = '';     // Mensaje de error mostrado al usuario.

  // Inyección del AuthService y del Router en el constructor.
  constructor(private authService: AuthService, private router: Router) {}

  // Método que se ejecuta al hacer clic en el botón de login.
  login() {
    // Limpia los mensajes anteriores antes de iniciar sesión.
    this.successMessage = '';
    this.errorMessage = '';

    // Llama al método login del AuthService y se suscribe al Observable que devuelve.
    this.authService.login(this.correo, this.contrasena).subscribe({
      // Si la respuesta es exitosa:
      next: (res: any) => {
        // Muestra un mensaje de bienvenida con el nombre del usuario.
        this.successMessage = `✅ ¡Bienvenido ${res.user.nombre}!`;
        // Guarda el token y los datos del usuario en localStorage.
        this.authService.guardarSesion(res.token, res.user);

        // Redirige al usuario al dashboard después de iniciar sesión exitosamente.
        this.router.navigate(['/dashboard']);
        
        // Limpia el formulario.
        this.resetForm();
      },
      // Si ocurre un error en la autenticación (correo o contraseña incorrectos).
      error: () => {
        // Muestra un mensaje de error.
        this.errorMessage = '❌ Correo o contraseña incorrectos.';
        // Limpia el formulario.
        this.resetForm();
      }
    });
  }

  // Método para limpiar los campos del formulario.
  resetForm() {
    this.correo = '';
    this.contrasena = '';
  }
}
