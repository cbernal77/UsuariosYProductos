import { Component } from '@angular/core';  // Importa el decorador Component de Angular
import { CommonModule } from '@angular/common';  // Importa el módulo común para directivas básicas
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar formularios y ngModel
import { RouterModule, ActivatedRoute, Router } from '@angular/router';  // Importa RouterModule y servicios para manejo de rutas
import { UsuarioService } from './usuario.service';  // Importa el servicio para manejar usuarios
import { Usuario } from './usuario.model';  // Importa la interfaz o modelo Usuario

@Component({
  selector: 'app-usuarios-editar',  // Define el selector del componente
  standalone: true,  // Indica que este componente es standalone (sin módulo)
  imports: [CommonModule, FormsModule, RouterModule],  // Módulos que usa el componente
  templateUrl: './usuarios-editar.component.html',  // Ruta del archivo HTML del componente
  styleUrls: ['./usuarios-editar.component.css']  // Ruta del archivo CSS del componente
})
export class UsuariosEditarComponent {  // Definición de la clase del componente
  usuario: Usuario = { nombre: '', correo: '', rol: 'cliente' };  // Inicializa un objeto usuario con valores vacíos
  success = '';  // Variable para almacenar mensajes de éxito
  error = '';  // Variable para almacenar mensajes de error
  usuarioId = '';  // Variable para almacenar el ID del usuario que se editará
  mostrarModalGuardar = false;  // Controla la visibilidad del modal para confirmar guardado

  constructor(
    private service: UsuarioService,  // Inyecta el servicio de usuarios
    private route: ActivatedRoute,  // Inyecta ActivatedRoute para acceder a parámetros de ruta
    private router: Router  // Inyecta Router para navegación programada
  ) {}

    ngOnInit() {
  const idParam = this.route.snapshot.params['id'];
  console.log('ID param recibido:', idParam);

  if (!idParam) {
    this.error = 'ID de usuario no proporcionado';
    return;
  }

  this.usuarioId = idParam;

  this.service.getUsuario(this.usuarioId).subscribe({
    next: (data: Usuario) => {
      console.log('Datos usuario:', data);
      this.usuario = data;
      this.error = '';
    },
    error: (err: any) => {
      console.error('Error al cargar usuario:', err);
      this.error = err.error?.message || 'Error cargando usuario';
    }
  });
}


  actualizarUsuario() {  // Método llamado al enviar el formulario para actualizar usuario
    this.mostrarModalGuardar = true;  // Muestra el modal para confirmar guardar los cambios
  }

    confirmarGuardar() {  // Método llamado cuando el usuario confirma guardar en el modal
  this.mostrarModalGuardar = false;  // Oculta el modal

  this.service.updateUsuario(this.usuarioId, this.usuario).subscribe({
    next: () => {
      this.success = 'Usuario actualizado';  // Muestra mensaje de éxito
      
      // Esperar 3 segundos antes de redirigir para que se vea el mensaje
      setTimeout(() => {
        this.router.navigate(['/usuarios']);
      }, 3000);

    },
    error: (err: any) => this.error = err.error?.message || 'Error al actualizar'
  });
}



  cancelarGuardar() {  // Método llamado para cancelar la acción de guardado
    this.mostrarModalGuardar = false;  // Simplemente oculta el modal sin hacer nada más
  }
}

