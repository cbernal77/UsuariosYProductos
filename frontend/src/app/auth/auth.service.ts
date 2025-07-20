
// Importa el decorador Injectable para que este servicio pueda ser inyectado en otros componentes o servicios.
import { Injectable } from '@angular/core';
// Importa HttpClient y HttpHeaders para realizar peticiones HTTP y configurar cabeceras.
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importa Observable desde rxjs, que representa respuestas asincrónicas.
import { Observable } from 'rxjs';

@Injectable({
  // Declara que este servicio estará disponible en toda la aplicación (nivel root).
  providedIn: 'root'
})
export class AuthService {
  // URL del endpoint para el login.
  private loginUrl = 'http://localhost:3000/api/auth/login';

  // Inyección del servicio HttpClient en el constructor para hacer peticiones HTTP.
  constructor(private http: HttpClient) {}

  // Método para iniciar sesión, recibe correo y contraseña.
  login(correo: string, contrasena: string): Observable<any> {
    // Envía una petición POST al backend con los datos de login y retorna un Observable.
    return this.http.post(this.loginUrl, { correo, contrasena });
  }

  // Guarda el token y los datos del usuario en el almacenamiento local del navegador.
  guardarSesion(token: string, user: any) {
    localStorage.setItem('token', token); // Guarda el token con clave 'token'.
    localStorage.setItem('usuario', JSON.stringify(user)); // Guarda el objeto usuario convertido a string.
  }

  // Recupera los datos del usuario desde localStorage.
  obtenerUsuario() {
    const userStr = localStorage.getItem('usuario'); // Obtiene el string del usuario.
    return userStr ? JSON.parse(userStr) : null; // Si existe, lo convierte a objeto, si no, devuelve null.
  }

  // Obtiene el rol del usuario desde el token almacenado.
  obtenerRol(): string | null {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage.
    if (!token) return null; // Si no hay token, retorna null.

    // Decodifica el payload del token (formato JWT: header.payload.signature).
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.rol || null; // Retorna el rol si existe, si no, null.
  }

  // Elimina los datos del token y usuario del almacenamiento local (cerrar sesión).
  cerrarSesion() {
    localStorage.removeItem('token'); // Borra el token.
    localStorage.removeItem('usuario'); // Borra los datos del usuario.
  }

  // Verifica si hay un token almacenado (es decir, si el usuario está autenticado).
  estaAutenticado(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay token, false si no.
  }

  // Devuelve un objeto con las cabeceras necesarias para hacer peticiones autenticadas.
  getAuthHeaders() {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage.
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}` // Agrega el token en la cabecera Authorization.
      })
    };
  }
}

