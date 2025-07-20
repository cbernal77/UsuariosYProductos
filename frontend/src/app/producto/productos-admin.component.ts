// src/app/producto/productos-admin.component.ts
// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core'; // Para crear componente e implementar ciclo de vida
import { CommonModule } from '@angular/common';    // Directivas comunes (ngIf, ngFor...)
import { FormsModule } from '@angular/forms';      // Para usar formularios con ngModel
import { HttpClientModule } from '@angular/common/http'; // Para peticiones HTTP
import { ProductoService } from './producto.service';   // Servicio para manejar productos
import { Router } from '@angular/router';  // Importa Router para navegación
@Component({
  selector: 'app-productos-admin',      // Selector HTML para este componente
  standalone: true,                     // Componente independiente (sin módulo)
  imports: [CommonModule, FormsModule, HttpClientModule], // Importa módulos necesarios
  templateUrl: './productos-admin.component.html',  // HTML asociado
  styleUrls: ['./productos-admin.component.css']    // CSS asociado
})
export class ProductosAdminComponent implements OnInit {
  productos: any[] = [];    // Array para guardar productos obtenidos del backend
  mensaje = '';             // Mensaje de estado (errores o éxito)
  editando = false;         // Flag para saber si estamos editando o creando nuevo producto

  mostrarModal = false;     // Controla si se muestra el modal de confirmación para eliminar
  productoAEliminarId: string | null = null;  // ID del producto que se quiere eliminar

  // Objeto que representa el producto que estamos creando o editando
  nuevoProducto: any = this.getProductoVacio();

  // Inyecta el servicio para manejar productos
  constructor(private productoService: ProductoService, private router: Router) {}

  // Al iniciar el componente, obtenemos la lista de productos
  ngOnInit() {
    this.obtenerProductos();
  }

  // Obtiene la lista de productos desde el backend
  obtenerProductos() {
    this.productoService.getProductos().subscribe({
      next: res => this.productos = res,          // Si va bien, guarda los productos
      error: () => this.mensaje = '❌ Error al obtener productos'  // Si falla, muestra error
    });
  }

  // Guarda el producto, crea o actualiza según el estado editando
  guardarProducto() {
    if (this.editando && this.nuevoProducto._id) {
      // Si estamos editando y el producto tiene ID, actualizamos
      this.productoService.actualizarProducto(this.nuevoProducto._id, this.nuevoProducto).subscribe({
        next: () => {
          this.mensaje = '✅ Producto actualizado';  // Mensaje éxito
          this.resetForm();                         // Limpia formulario
          this.obtenerProductos();                  // Refresca lista
          /*this.accionTerminada();*/ // Redirige al dashboard
        },
        error: () => this.mensaje = '❌ Error al actualizar producto' // Error al actualizar
      });
    } else {
      // Si no estamos editando, creamos nuevo producto
      this.productoService.crearProducto(this.nuevoProducto).subscribe({
        next: () => {
          this.mensaje = '✅ Producto creado';     // Mensaje éxito
          this.resetForm();                        // Limpia formulario
          this.obtenerProductos();                  // Refresca lista
          /*this.accionTerminada();*/ // Redirige al dashboard
        },
        error: () => this.mensaje = '❌ Error al crear producto' // Error al crear
      });
    }
  }

  // Prepara el formulario para editar el producto recibido como parámetro
  editarProducto(p: any) {
    this.nuevoProducto = { ...p };  // Clona el producto para editar
    this.editando = true;           // Marca que estamos editando
  }

  // Elimina un producto por su ID con confirmación
  eliminarProducto(id: string) {
    if (!confirm('¿Eliminar este producto?')) return; // Pregunta confirmación al usuario

    console.log('ID a eliminar:', id);  // Muestra en consola el ID que se eliminará

    // Llama al servicio para eliminar y maneja respuesta
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.mensaje = '✅ Producto eliminado';  // Mensaje éxito
        this.obtenerProductos();                  // Refresca lista
      /*this.accionTerminada(); */// Redirige al dashboard
      },
      error: () => this.mensaje = '❌ Error al eliminar producto' // Error al eliminar
    });
  }

  // Cancela la edición limpiando el formulario
  cancelarEdicion() {
    this.resetForm();
  }

  // Cancela la eliminación cerrando el modal y reseteando variables
  cancelarEliminar() {
    this.mostrarModal = false;
    this.productoAEliminarId = null;
  }

  // Muestra el modal de confirmación para eliminar producto con ID dado
  mostrarModalEliminar(id: string) {
    this.productoAEliminarId = id;  // Guarda ID del producto a eliminar
    this.mostrarModal = true;       // Muestra modal
  }

  // Confirma la eliminación cuando se aprueba en modal
  confirmarEliminar() {
    if (!this.productoAEliminarId) return;  // Si no hay ID, no hace nada

    // Llama al servicio para eliminar el producto y maneja respuestas
    this.productoService.eliminarProducto(this.productoAEliminarId).subscribe({
      next: () => {
        this.mensaje = '✅ Producto eliminado';  // Mensaje éxito
        this.obtenerProductos();                  // Refresca lista
        this.cancelarEliminar();                  // Cierra modal
      /*this.accionTerminada();*/ // Redirige al dashboard
      },
      error: () => {
        this.mensaje = '❌ Error al eliminar producto'; // Mensaje error
        this.cancelarEliminar();                  // Cierra modal igual
      }
    });
  }

  // Reinicia el formulario y cambia flag para crear nuevo producto
  resetForm() {
    this.nuevoProducto = this.getProductoVacio();  // Vuelve al producto vacío
    this.editando = false;                         // Marca que no estamos editando
  }

  // Devuelve un objeto con la estructura vacía de un producto
  getProductoVacio() {
    return {
      _id: undefined,    // Id indefinido para nuevo producto
      nombre: '',        // Nombre vacío
      descripcion: '',   // Descripción vacía
      precio: null,      // Precio nulo
      stock: null        // Stock nulo
    };
  }


  accionTerminada() {
  this.router.navigate(['/dashboard']);
}

}

