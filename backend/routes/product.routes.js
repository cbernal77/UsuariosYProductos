const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const authRole = require('../middlewares/authRole');
const Product = require('../models/product'); // Ajusta a tu modelo

// Todos pueden ver productos (sin token o con token)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Admin puede crear producto
router.post('/', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !descripcion || precio == null || stock == null) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      stock
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
});

// Admin puede actualizar producto
router.put('/:id', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
});

// Admin puede eliminar producto
router.delete('/:id', verifyToken, authRole('admin'), async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;

