// Importamos dependencias
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargamos variables de entorno desde .env
dotenv.config();

// Importamos la conexión a base de datos MongoDB
const connectDB = require('./config/database');

// Importamos rutas
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');


// Creamos la app Express
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware para CORS (permite solicitudes externas)
//app.use(cors());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

// Conectamos a la base de datos
connectDB();

// Definimos rutas base
app.use('/api/auth', authRoutes);       // Rutas de autenticación
app.use('/api/productos', productRoutes);// Rutas de productos
app.use('/api/users', userRoutes);      // Rutas de usuarios (solo admin)

// Puerto en el que corre el servidor (del .env o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en puerto ${PORT}`);
});
