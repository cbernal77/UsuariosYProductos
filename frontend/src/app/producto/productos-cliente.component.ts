// src/app/producto/productos-cliente.component.ts

// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core';            // Decoradores y ciclo de vida de Angular
import { CommonModule } from '@angular/common';               // Funcionalidades comunes (ngIf, ngFor, etc.)
import { HttpClientModule } from '@angular/common/http';      // Para hacer peticiones HTTP
import { ProductoService } from './producto.service';         // Servicio personalizado para productos
import { Router } from '@angular/router';   // <-- Importar Router
@Component({
  selector: 'app-productos-cliente',                         // Nombre de la etiqueta HTML del componente
  standalone: true,                                          // Indica que es un componente independiente
  imports: [CommonModule, HttpClientModule],                 // Módulos que importa para su funcionalidad
  templateUrl: './productos-cliente.component.html',         // Archivo HTML del componente
  styleUrls: ['./productos-cliente.component.css'],          // Archivo CSS del componente
})
export class ProductosClienteComponent implements OnInit {
  productos: any[] = [];                                      // Array donde se almacenan los productos
  mensaje = '';                                               // Mensaje de error o información

  constructor(private productoService: ProductoService, private router:Router) {}   // Inyección del servicio de productos

  ngOnInit() {
    // Se ejecuta cuando el componente se inicializa
    // Se suscribe al observable que obtiene los productos
    this.productoService.getProductos().subscribe({
      next: res => this.productos = res,                     // Si la petición es exitosa, guarda los productos
      error: () => this.mensaje = '❌ Error al obtener productos'  // En caso de error, muestra mensaje
    });
  }

  accionTerminada() {
    this.router.navigate(['/dashboard']);
  }
}
