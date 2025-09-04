const request = require('supertest');
const express = require('express');
const productRoutes = require('../../routes/product.routes');

jest.mock('../../middlewares/verifyToken', () => (req, res, next) => {
  req.user = { id: 'mockUserId', rol: 'admin' };
  next();
});
jest.mock('../../middlewares/authRole', () => (role) => (req, res, next) => {
  next();
});

// Mock de modelo
jest.mock('../../models/product', () => ({
  find: jest.fn().mockResolvedValue([{ nombre: 'Producto 1' }]),
  findByIdAndUpdate: jest.fn().mockResolvedValue({ nombre: 'Actualizado' }),
  findByIdAndDelete: jest.fn().mockResolvedValue({ nombre: 'Eliminado' }),
  create: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product Routes', () => {
  it('GET /api/products - debe devolver todos los productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/products - debe fallar si faltan campos', async () => {
    const res = await request(app).post('/api/products').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('DELETE /api/products/:id - debe eliminar producto', async () => {
    const res = await request(app).delete('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
