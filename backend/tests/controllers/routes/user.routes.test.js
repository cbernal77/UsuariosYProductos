const request = require('supertest');
const express = require('express');

const mockUserModel = {
  findById: jest.fn((id) => {
    if (id === '123456') {
      return {
        select: jest.fn().mockReturnValue(Promise.resolve(null)), // usuario no encontrado
      };
    }
    return {
      select: jest.fn().mockReturnValue(Promise.resolve({ _id: 'mockUserId', nombre: 'Mock User' })),
    };
  }),
  findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: 'mockUserId', nombre: 'Actualizado' }),
  find: jest.fn(() => ({
    select: jest.fn().mockReturnValue(Promise.resolve([{ _id: 'mockUserId', nombre: 'Mock User' }])),
  })),
  findOne: jest.fn().mockResolvedValue(null),
  findByIdAndDelete: jest.fn().mockResolvedValue({ _id: 'mockUserId' }),
  create: jest.fn(),
};

jest.mock('../../../models/user', () => mockUserModel);

jest.mock('../../../middlewares/verifyToken', () => (req, res, next) => {
  req.user = { id: 'mockUserId', rol: 'admin' };
  next();
});
jest.mock('../../../middlewares/authRole', () => (role) => (req, res, next) => {
  next();
});

// ✅ Luego la importación de userRoutes (¡IMPORTANTE!)
const userRoutes = require('../../../routes/user.routes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  it('GET /api/users/me - debe devolver el perfil del usuario', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nombre');
  });

  it('GET /api/users - debe devolver lista de usuarios (admin)', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/users/register - debe fallar si faltan campos', async () => {
    const res = await request(app).post('/api/users/register').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('GET /api/users/:id - debe devolver 404 si no existe', async () => {
    const res = await request(app).get('/api/users/123456');
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/users/:id - debe eliminar el usuario', async () => {
    const res = await request(app).delete('/api/users/123456');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
