

// Importaciones necesarias de Angular y RxJS
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Usuario } from './usuario.model';                      // Importamos la interfaz de usuario
import { Observable } from 'rxjs';                              // Para trabajar con observables
import { map } from 'rxjs/operators';                           // Operador para transformar datos

// Decorador que marca este servicio como disponible globalmente en toda la app
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL base de la API backend
  private apiUrl = 'http://localhost:3000/api/users';

  // Inyección del servicio HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método privado que genera cabeceras HTTP con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token guardado en localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`           // Agrega token como cabecera Authorization
    });
  }

  // ===========================
  // MÉTODOS PÚBLICOS DEL SERVICIO
  // ===========================

  // REGISTRAR USUARIO - Enviar datos de nuevo usuario al backend
  registrarUsuario(usuario: any): Observable<any> {
    // POST a /register con el objeto usuario
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  // OBTENER TODOS LOS USUARIOS - Devuelve un array de usuarios (requiere token)
  getUsuarios(): Observable<Usuario[]> {
    const headers = this.getAuthHeaders(); // Obtiene cabecera con token
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((users: any[]) =>                    // Transforma respuesta de la API
        users.map((u: any) => ({               // Mapea cada usuario para usar el modelo local
          id: u._id,                           // Convierte _id (MongoDB) en id
          nombre: u.nombre,
          correo: u.correo,
          contrasena: u.contrasena,            // Este campo puede omitirse si no se necesita
          rol: u.rol
        }))
      )
    );
  }

  // OBTENER USUARIO POR ID - Requiere token
  getUsuario(id: string): Observable<Usuario> {
    // GET a /users/:id con cabeceras de autenticación
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // CREAR USUARIO - Útil para crear usuarios desde panel admin (similar a registrar)
  createUsuario(usuario: Usuario): Observable<Usuario> {
    // POST a /register con el nuevo usuario
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
  }

  // ACTUALIZAR USUARIO POR ID - Modifica un usuario existente (requiere token)
  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    // PUT a /users/:id con los datos modificados y token
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, {
      headers: this.getAuthHeaders()
    });
  }

  // ELIMINAR USUARIO - Elimina un usuario por ID (requiere token)
  deleteUsuario(id: string) {
    const headers = this.getAuthHeaders(); // Cabecera con token
    // DELETE a /users/:id
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // ACTUALIZAR PERFIL DEL USUARIO ACTUAL - Usa endpoint /me
  updatePerfil(usuario: Usuario): Observable<Usuario> {
    const token = localStorage.getItem('token'); // Obtiene token manualmente
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Cabecera
    // PUT a /me con datos del usuario actual
    return this.http.put<Usuario>(`${this.apiUrl}/me`, usuario, { headers });
  }

  // OBTENER PERFIL DEL USUARIO ACTUAL - Usa endpoint /me
  getPerfil(): Observable<Usuario> {
    const token = localStorage.getItem('token'); // Obtiene token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Cabecera
    // GET a /me para obtener los datos del usuario logueado
    return this.http.get<Usuario>(`${this.apiUrl}/me`, { headers });
  }

}
