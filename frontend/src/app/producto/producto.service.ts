// src/app/producto/producto.service.ts

// Importa Injectable para poder inyectar el servicio en toda la app
import { Injectable } from '@angular/core';

// Importa HttpClient para hacer peticiones HTTP y HttpHeaders para agregar headers personalizados
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importa Observable para manejar las respuestas asincrónicas de las peticiones HTTP
import { Observable } from 'rxjs';

// Define el servicio con alcance global (root), para que pueda ser usado en toda la app sin declararlo en providers
@Injectable({ providedIn: 'root' })
export class ProductoService {
  // URL base de la API para productos (ajustar según configuración backend)
  private apiUrl = 'http://localhost:3000/api/productos';

  // Inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener la lista de productos (GET)
  getProductos(): Observable<any> {
    // Hace una petición GET al endpoint de productos, con opción de enviar cookies (si se usan)
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  // Método para crear un producto (POST)
  crearProducto(producto: any): Observable<any> {
    // Obtiene el token almacenado localmente (ejemplo: localStorage)
    const token = localStorage.getItem('token');

    // Configura los headers HTTP para enviar el token en Authorization como Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Hace una petición POST enviando el producto y los headers de autorización
    return this.http.post(this.apiUrl, producto, { headers });
  }
  
  // Método para actualizar un producto existente (PUT)
  actualizarProducto(id: string, producto: any): Observable<any> {
    // Obtiene el token mediante función dedicada
    const token = this.getToken();

    // Crea headers solo si el token existe, de lo contrario queda undefined
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    // Hace la petición PUT enviando el producto actualizado y headers (si hay)
    return this.http.put(`${this.apiUrl}/${id}`, producto, { headers });
  }

  // Método para obtener el token almacenado (puede cambiar según donde guardes el token)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para eliminar un producto (DELETE)
  eliminarProducto(id: string): Observable<any> {
    // Obtiene el token para autorización
    const token = this.getToken();

    // Crea headers solo si existe token
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    // Hace la petición DELETE con headers para eliminar el producto por ID
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

}

