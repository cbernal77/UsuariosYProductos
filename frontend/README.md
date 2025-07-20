
# UsuariosYProductos

Proyecto Fullstack para la gestión de usuarios y productos, con backend en Node.js y frontend en Angular.

---

## 📁 Estructura del Proyecto

```plaintext
UsuariosYProductos/
├── backend/                          # Carpeta raíz del backend
│   ├── .env                         # Variables de entorno
│   ├── index.js                     # Archivo principal del servidor backend
│   ├── package-lock.json            # Lock de dependencias npm
│   ├── package.json                 # Configuración de dependencias npm
│   ├── config/                      # Configuración general
│   │   └── database.js              # Configuración de la base de datos
│   ├── controllers/                 # Controladores para lógica de negocio
│   │   ├── auth.controller.js       # Controlador de autenticación
│   │   ├── product.controller.js    # Controlador de productos
│   │   └── user.controller.js       # Controlador de usuarios
│   ├── middlewares/                 # Middlewares para rutas y seguridad
│   │   ├── authRole.js              # Middleware para roles de usuario
│   │   └── verifyToken.js           # Middleware para verificación de tokens
│   ├── models/                      # Modelos de datos (MongoDB, Sequelize, etc.)
│   │   ├── product.js               # Modelo de producto
│   │   └── user.js                  # Modelo de usuario
│   ├── node_modules/                # Dependencias instaladas (npm)
│   └── routes/                     # Definición de rutas API
│       ├── auth.routes.js           # Rutas de autenticación
│       ├── product.routes.js        # Rutas de productos
│       └── user.routes.js           # Rutas de usuarios
└── frontend/                        # Carpeta raíz del frontend (Angular)
    ├── .angular/                   # Archivos ocultos de Angular CLI
    ├── .editorconfig               # Configuración del editor de código
    ├── .gitignore                  # Archivos ignorados por Git
    ├── .vscode/                   # Configuración del VSCode para frontend
    ├── angular.json               # Configuración principal de Angular CLI
    ├── node_modules/              # Dependencias instaladas (npm)
    ├── package-lock.json          # Lock de dependencias npm frontend
    ├── package.json               # Configuración de dependencias npm frontend
    ├── public/                    # Archivos estáticos públicos
    ├── README.md                  # Documentación del proyecto frontend
    ├── src/                      # Código fuente de la aplicación Angular
    │   ├── index.html             # Archivo HTML principal
    │   ├── main.ts                # Entrada principal de la app Angular
    │   ├── styles.css             # Estilos globales CSS
    │   └── app/                  # Carpeta principal de componentes y módulos Angular
    │       ├── app-routing.module.ts  # Módulo de rutas principal
    │       ├── app.component.css        # Estilos globales del componente raíz
    │       ├── app.component.html       # Template HTML del componente raíz
    │       ├── app.component.ts         # Lógica TypeScript del componente raíz
    │       ├── app.config.ts            # Configuración general de la app Angular
    │       ├── app.css                  # Estilos globales extra
    │       ├── app.module.ts            # Módulo principal de Angular
    │       ├── app.routes.ts            # Definición de rutas
    │       ├── app.spec.ts              # Tests para el componente raíz
    │       ├── auth/                    # Módulo y componentes para autenticación
    │       │   ├── auth.component.css
    │       │   ├── auth.component.html
    │       │   ├── auth.component.ts
    │       │   ├── auth.component.spec.ts
    │       │   └── auth.service.ts
    │       ├── dashboard/               # Componentes del dashboard principal
    │       │   ├── dashboard.component.css
    │       │   ├── dashboard.component.html
    │       │   └── dashboard.component.ts
    │       ├── producto/                # Módulo de productos para admins y clientes
    │       │   ├── productos.service.ts
    │       │   ├── productos-admin.component.css
    │       │   ├── productos-admin.component.html
    │       │   ├── productos-admin.component.ts
    │       │   ├── productos-cliente.component.css
    │       │   ├── productos-cliente.component.html
    │       │   └── productos-cliente.component.ts
    │       ├── register/                # Componentes para registro de usuarios
    │       │   ├── register.component.css
    │       │   ├── register.component.html
    │       │   └── register.component.ts
    │       ├── usuario/                 # Módulo de usuarios con CRUD y perfil
    │       │   ├── usuario.model.ts
    │       │   ├── usuario.service.ts
    │       │   ├── usuarios-crear.component.css
    │       │   ├── usuarios-crear.component.html
    │       │   ├── usuarios-crear.component.ts
    │       │   ├── usuarios-editar.component.css
    │       │   ├── usuarios-editar.component.html
    │       │   ├── usuarios-editar.component.ts
    │       │   ├── usuarios-list.component.css
    │       │   ├── usuarios-list.component.html
    │       │   ├── usuarios-list.component.ts
    │       │   ├── usuarios-perfil.component.css
    │       │   ├── usuarios-perfil.component.html
    │       │   └── usuarios-perfil.component.ts
    │       └── welcome/                # Componente de bienvenida
    │           ├── welcome.component.css
    │           ├── welcome.component.html
    │           ├── welcome.component.spec.ts
    │           └── welcome.component.ts
    ├── tsconfig.app.json             # Configuración TypeScript para la app
    ├── tsconfig.json                 # Configuración general TypeScript
    └── tsconfig.spec.json            # Configuración para tests TypeScript
```
## Cómo clonar el repositorio

```bash
git clone https://github.com/tu_usuario/UsuariosYProductos.git
cd UsuariosYProductos
```

## Instalación y Configuración

### Backend

1. Navegar al directorio backend:
   ```bash
   cd backend

2. Instalar dependencias:

npm install

3. Crear archivo .env con las variables necesarias (ejemplo):

PORT=3000
MONGODB_URI=mongodb://localhost/usuariosproductos
JWT_SECRET=tu_secreto

4. Iniciar servidor:

npm start


### 🔐 Credenciales de prueba

Estas credenciales están incluidas en los datos de prueba para iniciar sesión:

| Usuario                                                          | Contraseña   | Rol      |
| ---------------------------------------------------------------- | ------------ | -------- |
| [ariana.torres@demo.com](mailto:ariana.torres@demo.com)         | AriPass123   | admin    |
| [mateo.rivas@demo.com](mailto:mateo.rivas@demo.com)             | Mateo1234    | cliente  |
| [camila.fuentes@demo.com](mailto:camila.fuentes@demo.com)       | Cami4567     | cliente  |
| [lucas.moreno@demo.com](mailto:lucas.moreno@demo.com)           | Lucas2024    | cliente  |
| [valentina.diaz@demo.com](mailto:valentina.diaz@demo.com)       | Vale7890     | cliente  |


### 🛍️ Productos de prueba

| Producto                 | Descripción                                           | Precio | Stock |
|--------------------------|--------------------------------------------------------|--------|-------|
| Camisa                   | Manga corta                                            | 50     | 20    |
| Zapatos                  | Zapatos deportivos                                     | 120    | 10    |
| Mochila Explorer         | Mochila resistente al agua con múltiples compartimientos | 89     | 15    |
| Reloj Digital            | Reloj deportivo resistente al agua                    | 65     | 30    |
| Audífonos Inalámbricos   | Bluetooth 5.0, cancelación de ruido, estuche cargador | 99     | 25    |


## 📬 Endpoints principales

A continuación, se detallan los endpoints disponibles en la API backend, agrupados por funcionalidad.

---

### 🔐 Autenticación (`/api/auth`)

| Método | Ruta           | Descripción                | Requiere Token |
|--------|----------------|----------------------------|----------------|
| POST   | /register      | Registrar un nuevo usuario | ❌             |
| POST   | /login         | Iniciar sesión             | ❌             |

---

### 👤 Usuarios (`/api/users`)

| Método | Ruta          | Descripción                                  | Requiere Token | Rol requerido |
|--------|---------------|----------------------------------------------|----------------|----------------|
| GET    | /me           | Obtener perfil del usuario autenticado       | ✅             | Usuario/Admin  |
| PUT    | /me           | Actualizar perfil del usuario autenticado    | ✅             | Usuario/Admin  |
| GET    | /perfil       | Obtener perfil (alias)                       | ✅             | Usuario/Admin  |
| GET    | /             | Obtener lista de todos los usuarios          | ✅             | Admin          |
| POST   | /register      | Registrar nuevo usuario (por Admin)          | ❌             | —              |
| PUT    | /:id          | Actualizar usuario por ID                    | ✅             | Admin          |
| DELETE | /:id          | Eliminar usuario por ID                      | ✅             | Admin          |

---

### 📦 Productos (`/api/productos`)

| Método | Ruta     | Descripción                           | Requiere Token | Rol requerido |
|--------|----------|---------------------------------------|----------------|----------------|
| GET    | /        | Obtener todos los productos           | ❌             | —              |
| POST   | /        | Crear un nuevo producto               | ✅             | Admin          |
| PUT    | /:id     | Actualizar producto por ID            | ✅             | Admin          |
| DELETE | /:id     | Eliminar producto por ID              | ✅             | Admin          |

---

> 🔒 Las rutas protegidas utilizan los middlewares `verifyToken` para autenticación y `authRole('admin')` para control de acceso por rol.



### frontend

1. Navegar al directorio frontend:

cd frontend

2. Instalar dependencias:

npm install

3. Iniciar aplicación Angular:

ng serve

4. Abrir en el navegador:

http://localhost:4200


### Funcionalidades

- Registro y autenticación de usuarios con roles

- CRUD completo para usuarios y productos

- Dashboard para administración

- Perfiles de usuario

- Panel para clientes con visualización de productos




## Tecnologías Utilizadas

- **Backend:**
  - Node.js
  - Express
  - MongoDB (o la base de datos que uses)
  - JWT para autenticación

- **Frontend:**
  - Angular
  - TypeScript
  - CSS




# Frontend

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.





