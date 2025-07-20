const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-contrasena'); // Excluye contrasena
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.nombre = nombre || user.nombre;
    user.correo = correo || user.correo;
    user.rol = rol || user.rol;

    await user.save();

    const { contrasena, ...userData } = user.toObject();

    res.json({ message: 'Usuario actualizado', user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
