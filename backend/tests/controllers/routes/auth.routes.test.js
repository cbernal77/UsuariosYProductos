const request = require('supertest');
const express = require('express');
const authRoutes = require('../../../routes/auth.routes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  it('POST /api/auth/register - debe registrar un nuevo usuario (faltan campos)', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Nombre, correo y contraseña son obligatorios');

    //expect(res.body).toHaveProperty('message', 'Faltan datos obligatorios');
  });

  it('POST /api/auth/login - debe fallar si faltan campos', async () => {
    const res = await request(app).post('/api/auth/login').send({ correo: '' });
    expect(res.statusCode).toBe(400); // según tu lógica
  });
});
