// src/app/usuario/usuarios-perfil.component.ts

// Importaciones necesarias de Angular y del servicio/ modelo de usuario
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { Router } from '@angular/router';  // <-- Importar Router

@Component({
  selector: 'app-usuarios-perfil',     // Selector del componente
  standalone: true,                    // Componente standalone sin módulo aparte
  imports: [CommonModule, FormsModule], // Importa módulos necesarios para la plantilla
  templateUrl: './usuarios-perfil.component.html', // Archivo HTML asociado
  styleUrls: ['./usuarios-perfil.component.css']   // Archivo CSS asociado
})
export class UsuariosPerfilComponent {

  // Modelo usuario parcialmente tipado, puede incluir opcionalmente contraseña
  usuario: Partial<Usuario & { contrasena?: string }> = { nombre: '', correo: '', rol: 'cliente' };

  // Mensajes para mostrar éxito o error
  success = '';
  error = '';

  // Inyección del servicio UsuarioService para hacer llamadas a API
  constructor(private service: UsuarioService,private router: Router) {}

  // Ciclo de vida OnInit para cargar perfil al iniciar componente
  ngOnInit() {
    this.service.getPerfil().subscribe({
      // Si la llamada es exitosa, asigna datos recibidos a usuario
      next: (data: Usuario) => this.usuario = data,
      // Si hay error, asigna mensaje a error
      error: (err: any) => this.error = err.error?.message || 'Error cargando perfil'
    });
  }

  // Método para actualizar datos del perfil
  actualizarPerfil() {
    // Validación mínima: nombre y correo deben estar presentes
    if (!this.usuario.nombre || !this.usuario.correo) {
      this.error = 'Nombre y correo son obligatorios';
      return;  // Sale si no pasa validación
    }

    // Llama al servicio para actualizar el perfil, pasando el usuario cast a Usuario
    this.service.updatePerfil(this.usuario as Usuario).subscribe({
      // En caso de éxito muestra mensaje de éxito
      next: () => this.success = 'Perfil actualizado',
    
      // En caso de error muestra mensaje de error recibido o por defecto
      error: (err: any) => this.error = err.error?.message || 'Error al actualizar perfil'
    });
  }

   accionTerminada() {
    this.router.navigate(['/dashboard']);
  }
}

