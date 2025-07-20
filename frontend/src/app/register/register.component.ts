// register.component.ts

// Importación de decoradores y módulos necesarios para el componente
import { Component } from '@angular/core';                     // Permite definir un componente de Angular
import { Router } from '@angular/router';                     // Permite redireccionar al usuario tras el registro
import { UsuarioService } from '../usuario/usuario.service';  // Servicio que maneja la lógica de usuario (registro, login, etc.)
import { CommonModule } from '@angular/common';               // Módulo para directivas comunes como *ngIf, *ngFor
import { FormsModule } from '@angular/forms';                 // Módulo necesario para usar [(ngModel)] en formularios

@Component({
  selector: 'app-register',                                   // Selector para usar este componente en HTML
  standalone: true,                                           // Indica que este componente es independiente (no necesita un módulo)
  imports: [CommonModule, FormsModule],                       // Importa módulos necesarios para la plantilla HTML
  templateUrl: './register.component.html',                   // Ruta al archivo HTML de este componente
  styleUrls: ['./register.component.css']                     // Ruta a los estilos CSS de este componente
})
export class RegisterComponent {

  // Variables enlazadas al formulario HTML
  nombre: string = '';             // Nombre del usuario
  correo: string = '';             // Correo electrónico
  contrasena: string = '';         // Contraseña del usuario
  rol: string = 'cliente';         // Rol del usuario, por defecto es 'cliente'
  error: string = '';              // Mensaje de error en caso de fallo
  success: string = '';             //variable para mensaje exito
  
  // Inyección de dependencias: UsuarioService para interactuar con la API, Router para redirección
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  // Función que se ejecuta al enviar el formulario de registro
  registrar() {

    // Mensajes de consola para depuración (verifican si los valores están bien enlazados)
    console.log('nombre:', this.nombre);
    console.log('correo:', this.correo);
    console.log('contrasena:', this.contrasena);
    console.log('rol:', this.rol);

    // Validación básica: comprobar que todos los campos estén completos
    if (!this.nombre || !this.correo || !this.contrasena || !this.rol) {
      this.error = 'Por favor, complete todos los campos';
      return; // Si falta algún dato, se detiene la ejecución
    }

    // Crea un objeto con los datos del formulario
    const nuevoUsuario = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      rol: this.rol
    };

    // Llama al servicio para registrar al usuario en el backend
    
    this.usuarioService.registrarUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.success = 'Registro exitoso';   // <-- mostrar mensaje éxito
        this.error = '';                     // <-- limpiar error si existía

        // Opcional: limpiar campos para evitar enviar dos veces igual
        this.nombre = '';
        this.correo = '';
        this.contrasena = '';
        this.rol = 'cliente';

        // Después de unos segundos redirigir (ejemplo: 2 segundos)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar usuario';
        this.success = '';  // limpiar éxito si hubo error
      }
    });
  
  }// fin de registrar
}
