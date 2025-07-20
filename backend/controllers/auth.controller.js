const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro usuario

exports.register = async (req, res) => {
  try {
    const nombre = req.body?.nombre?.trim?.();
    const correo = req.body?.correo?.trim?.();
    const contrasena = req.body?.contrasena?.trim?.();
    const rol = req.body?.rol?.trim?.();

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
    }

    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const newUser = new User({ nombre, correo, contrasena: hashedPassword, rol: rol || 'cliente' });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

exports.login = async (req, res) => {
  console.log('Body login:', req.body);

  try {
    const correo = req.body?.correo?.trim?.();
    const contrasena = req.body?.contrasena?.trim?.();

    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    const user = await User.findOne({ correo });
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

    //console.log('contrasena recibida:', contrasena);
    //console.log('contrasena guardada:', user.contrasena);

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: user._id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

    const { contrasena: _, ...userData } = user.toObject();
    res.json({ message: 'Inicio de sesión exitoso', user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

