// src/app/usuario/usuarios-crear.component.ts

import { Component } from '@angular/core';  // Importa el decorador Component de Angular
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas básicas
import { FormsModule } from '@angular/forms';  // Importa FormsModule para trabajar con formularios y ngModel
import { RouterModule, Router } from '@angular/router';  // Importa RouterModule y Router para navegación
import { UsuarioService } from './usuario.service';  // Importa el servicio que maneja usuarios
import { Usuario } from './usuario.model';  // Importa el modelo/Interfaz Usuario

@Component({
  selector: 'app-usuarios-crear',  // Define el selector del componente
  standalone: true,  // Indica que es un componente independiente (sin módulo)
  imports: [CommonModule, FormsModule, RouterModule],  // Módulos que usa el componente
  templateUrl: './usuarios-crear.component.html',  // Ruta del archivo HTML
  styleUrls: ['./usuarios-crear.component.css']  // Ruta del archivo CSS
})
export class UsuariosCrearComponent {  // Clase del componente
  usuario: Usuario = { nombre: '', correo: '', rol: 'cliente' };  // Inicializa un nuevo usuario con valores por defecto
  success = '';  // Variable para mensajes de éxito
  error = '';  // Variable para mensajes de error

  constructor(private service: UsuarioService, private router: Router) {}  // Inyecta el servicio de usuarios y el router

  crearUsuario() {  // Método para crear un usuario nuevo
  this.service.createUsuario(this.usuario).subscribe({  // Llama al servicio para crear usuario con los datos actuales
    next: () => {
      this.success = '✅ Usuario creado';  // Mensaje de éxito si la creación fue exitosa
      setTimeout(() => {
        this.router.navigate(['/usuarios']);  // Redirige a la lista de usuarios después de 2 segundos
      }, 2000);
    },
    error: err => this.error = err.error?.message || 'Error al crear usuario'  // Captura y muestra error si ocurre
  });
}


} // fin del export class
