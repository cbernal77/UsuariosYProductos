
import { NgModule } from '@angular/core'; 
// Importa el decorador NgModule para definir un módulo Angular

import { BrowserModule } from '@angular/platform-browser';
// Importa BrowserModule que es necesario para aplicaciones Angular que se ejecutan en navegador

import { AppComponent } from './app.component'; 
// Importa el componente raíz, que es standalone (aunque aquí no está incluido en imports)

import { HttpClientModule } from '@angular/common/http'; 
// Importa módulo para hacer peticiones HTTP (HttpClient)

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Importa módulos para manejo de formularios template-driven y reactivos respectivamente

import { provideHttpClient, withFetch } from '@angular/common/http';
// Importa funciones para proveer cliente HTTP con fetch (no están usadas en el módulo aquí)

import { ProductosAdminComponent } from './producto/productos-admin.component';
// Importa componente para administración de productos

import { ProductosClienteComponent } from './producto/productos-cliente.component';
// Importa componente para vista de productos para clientes

@NgModule({
  imports: [
    BrowserModule,             // Módulo necesario para apps en navegador
    HttpClientModule,          // Habilita HttpClient para hacer solicitudes HTTP
    FormsModule,               // Soporte para formularios template-driven
    ProductosAdminComponent,   // Componente standalone de productos admin incluido
    ReactiveFormsModule,       // Soporte para formularios reactivos
    ProductosClienteComponent  // Componente standalone para productos cliente incluido
  ],
  // Aquí no hay declarations ni providers ni bootstrap (probablemente lo maneja standalone)
})
export class AppModule { }

