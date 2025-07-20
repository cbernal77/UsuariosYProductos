const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const authRole = require('../middlewares/authRole');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// ==========================
// RUTAS CLIENTE Y ADMIN PARA SU PERFIL (deben ir PRIMERO)
// ==========================

// Obtener perfil propio
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-contrasena');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
});

// Actualizar perfil propio (no puede cambiar rol)
router.put('/me', verifyToken, async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.rol;

    if (updates.contrasena) {
      const salt = await bcrypt.genSalt(10);
      updates.contrasena = await bcrypt.hash(updates.contrasena, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-contrasena');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

// Alias opcional
router.get('/perfil', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-contrasena');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
});


// ==========================
// RUTAS ADMIN (CRUD usuarios)
// ==========================

// Obtener todos los usuarios (solo admin)
router.get('/', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-contrasena');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});
// ==========================================
// RUTA PARA REGISTRAR UN NUEVO USUARIO
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    // Verificar que todos los campos sean proporcionados
    if (!nombre || !correo || !contrasena || !rol) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Crear un nuevo usuario
    const newUser = new User({
      nombre,
      correo,
      contrasena: hashedPassword,
      rol
    });

    // Guardar el nuevo usuario
    await newUser.save();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Obtener un usuario por ID (solo admin)
router.get('/:id', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-contrasena');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
});


router.put('/:id', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const updates = { ...req.body };
    console.log('ID recibido:', req.params.id);
    console.log('Datos a actualizar:', updates);

    if (updates.contrasena) {
      const salt = await bcrypt.genSalt(10);
      updates.contrasena = await bcrypt.hash(updates.contrasena, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-contrasena');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // ✅ Solo una respuesta aquí
    return res.json(updatedUser);
  } catch (error) {
    console.error('Error real:', error);

    // ✅ Solo una respuesta aquí en caso de error
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  }
});

router.delete('/:id', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});




module.exports = router;

