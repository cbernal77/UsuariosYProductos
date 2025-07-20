
import { NgModule } from '@angular/core';  // Importa NgModule para definir un módulo Angular (aunque no se usa directamente aquí)
import { RouterModule, Routes } from '@angular/router';  // Importa RouterModule y tipo Routes para definir rutas
import { AuthComponent } from './auth/auth.component';  // Importa el componente de autenticación (login)
import { WelcomeComponent } from './welcome/welcome.component'; // Importa el componente Welcome
import { DashboardComponent } from './dashboard/dashboard.component'; // Importa el componente Dashboard

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: 'login', component: AuthComponent },  // Ruta para la página de login

  { path: 'dashboard', component: DashboardComponent },  // Ruta para la página del dashboard
  { path: 'welcome', component: WelcomeComponent },  // Ruta para la página Welcome

  // Ruta con carga perezosa (lazy loading) del componente ProductosAdmin
  {
    path: 'productos-admin',
    loadComponent: () => import('./producto/productos-admin.component').then(m => m.ProductosAdminComponent)
  },

  // Ruta con carga perezosa del componente ProductosCliente
  {
    path: 'productos-cliente',
    loadComponent: () => import('./producto/productos-cliente.component').then(m => m.ProductosClienteComponent)
  },

  // Rutas para manejo de usuarios usando carga perezosa de componentes standalone

  // Lista de usuarios
  { path: 'usuarios', loadComponent: () => import('./usuario/usuarios-list.component').then(m => m.UsuariosListComponent) },

  // Crear nuevo usuario
  { path: 'usuarios-crear', loadComponent: () => import('./usuario/usuarios-crear.component').then(m => m.UsuariosCrearComponent) },

  // Editar usuario con parámetro dinámico :id
  { path: 'usuarios-editar/:id', loadComponent: () => import('./usuario/usuarios-editar.component').then(m => m.UsuariosEditarComponent) },

  // Perfil de usuario actual
  { path: 'perfil', loadComponent: () => import('./usuario/usuarios-perfil.component').then(m => m.UsuariosPerfilComponent) },

  // Ruta vacía redirige a la página Welcome por defecto
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

  // Ruta comodín para rutas no definidas redirige a Welcome
  { path: '**', redirectTo: 'welcome' }
];

export default routes;  // Exporta las rutas para ser usadas en el módulo principal de la aplicación
