
import { Component, OnInit } from '@angular/core';  // Importa Component e OnInit para ciclo de vida
import { CommonModule } from '@angular/common';      // Importa CommonModule para directivas comunes
import { RouterModule } from '@angular/router';      // Importa RouterModule para navegación
import { UsuarioService } from './usuario.service'; // Servicio para manejar usuarios
import { Usuario } from './usuario.model';           // Modelo de Usuario
import { Router } from '@angular/router';            // Servicio Router para navegación programática
import { AuthService } from '../auth/auth.service';  // Servicio de autenticación para verificar roles


@Component({
  selector: 'app-usuarios-list',                     // Selector del componente
  standalone: true,                                  // Indica que es componente independiente
  imports: [CommonModule, RouterModule],             // Módulos importados
  templateUrl: './usuarios-list.component.html',    // Ruta de la plantilla HTML
  styleUrls: ['./usuarios-list.component.css']      // Ruta del archivo CSS
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];                          // Array para almacenar la lista de usuarios
  error = '';                                        // Variable para mostrar errores

  mostrarModalEliminar = false;                      // Flag para mostrar/ocultar modal de confirmación de eliminación
  idUsuarioAEliminar?: string;                        // Guarda el id del usuario a eliminar (opcional)

  // Inyección de dependencias: servicios necesarios para el componente
  constructor(
    private usuarioService: UsuarioService,          // Servicio para operaciones con usuarios
    private router: Router,                           // Router para navegación
    private authService: AuthService                  // Servicio de autenticación para obtener roles
  ) {}

  // Método del ciclo de vida que se ejecuta al iniciar el componente
  ngOnInit() {
    this.load();                                     // Carga la lista de usuarios al inicializar
  }

  // Método para cargar la lista de usuarios desde la API
  load() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);    // Muestra en consola los usuarios recibidos
        this.usuarios = data;                         // Asigna la data recibida a la propiedad usuarios
      },
      error: (err) => this.error = err.error?.message || 'Error al cargar usuarios' // Manejo de error
    });
  }

  // Método para verificar si el usuario actual es administrador
  esAdmin(): boolean {
    // Usa el servicio de autenticación para obtener el rol y compara con 'admin'
    return this.authService.obtenerRol() === 'admin';  
  }

  // Método para navegar a la página de creación de usuarios
  irARegistrarUsuario(): void {
    this.router.navigate(['/usuarios-crear']);      // Redirige a la ruta para crear usuario
  }

  // Método para iniciar la edición de un usuario pasando su id
  editarUsuario(id?: string) {
    console.log('editarUsuario ID recibido:', id);  // Debug: muestra el id recibido
    if (!id) {                                       // Validación simple para evitar id inválido
      alert('ID de usuario no válido');
      return;
    }
    this.router.navigate(['/usuarios-editar', id]); // Navega a la ruta de edición con el id
  }

  // Método que muestra el modal para confirmar eliminación del usuario
  eliminarUsuario(id?: string) {
    if (!id) {
      alert('ID de usuario no válido');
      return;
    }
    this.idUsuarioAEliminar = id;                    // Guarda el id para eliminar
    this.mostrarModalEliminar = true;                // Muestra el modal de confirmación
  }

  // Método que confirma y ejecuta la eliminación del usuario
  confirmarEliminar() {
    if (!this.idUsuarioAEliminar) return;            // Si no hay id, no hacer nada

    this.usuarioService.deleteUsuario(this.idUsuarioAEliminar).subscribe({
      next: () => {
        this.mostrarModalEliminar = false;           // Oculta el modal tras eliminar
        this.load();                                  // Recarga la lista de usuarios
      },
      error: err => {
        this.mostrarModalEliminar = false;           // Oculta el modal si hubo error
        alert(err.error?.message || 'Error al eliminar usuario'); // Muestra alerta de error
      }
    });
  }

  // Método para cancelar la acción de eliminar usuario y ocultar el modal
  cancelarEliminar() {
    this.mostrarModalEliminar = false;               // Oculta el modal
    this.idUsuarioAEliminar = undefined;             // Resetea el id del usuario a eliminar
  }

// Método para volver al dashboard
  accionTerminada() {
    this.router.navigate(['/dashboard']);
  }

}
