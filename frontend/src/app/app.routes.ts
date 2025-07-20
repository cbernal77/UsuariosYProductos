
// src/app/app.routes.ts
import { Routes } from '@angular/router';
// Importa el tipo Routes de Angular para definir rutas

export const appRoutes: Routes = [
  // Array de rutas que define la navegación de la app

  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
    // Ruta raíz ('') que carga el componente Welcome de forma lazy (carga perezosa)
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
    // Ruta para login, carga perezosa del componente Auth
  },

  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    // Ruta para registro de usuarios, carga perezosa del componente Register
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    // Ruta para el dashboard, carga perezosa del componente Dashboard
  },

  {
    path: 'productos-admin',
    loadComponent: () => import('./producto/productos-admin.component').then(m => m.ProductosAdminComponent)
    // Ruta para administración de productos, carga perezosa del componente ProductosAdminComponent
  },

  {
    path: 'productos-cliente',
    loadComponent: () => import('./producto/productos-cliente.component').then(m => m.ProductosClienteComponent)
    // Ruta para vista de productos para cliente, carga perezosa del componente ProductosClienteComponent
  },

  {
    path: 'usuarios',
    loadComponent: () => import('./usuario/usuarios-list.component').then(m => m.UsuariosListComponent)
    // Ruta para lista de usuarios, carga perezosa del componente UsuariosListComponent
  },

  {
    path: 'usuarios-crear',
    loadComponent: () => import('./usuario/usuarios-crear.component').then(m => m.UsuariosCrearComponent)
    // Ruta para crear usuario, carga perezosa del componente UsuariosCrearComponent
  },

  {
    path: 'usuarios-editar/:id',
    loadComponent: () => import('./usuario/usuarios-editar.component').then(m => m.UsuariosEditarComponent)
    // Ruta para editar usuario, con parámetro dinámico 'id', carga perezosa del componente UsuariosEditarComponent
  },

  {
    path: 'perfil',
    loadComponent: () => import('./usuario/usuarios-perfil.component').then(m => m.UsuariosPerfilComponent)
    // Ruta para el perfil del usuario, carga perezosa del componente UsuariosPerfilComponent
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Redirige la ruta raíz a 'login' si no se especifica nada (pathMatch full para ruta exacta)

  { path: '**', redirectTo: '' }
  // Ruta comodín para manejar cualquier ruta no definida, redirige a raíz (welcome)
];
