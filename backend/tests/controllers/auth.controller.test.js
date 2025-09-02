const authController = require('../../controllers/auth.controller');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('auth.controller', () => {

  describe('register', () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          nombre: 'Test User',
          correo: 'test@example.com',
          contrasena: 'password123',
          rol: 'cliente'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      User.findOne.mockReset();
      User.prototype.save = jest.fn();
    });

    it('debería registrar un usuario correctamente', async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue();

      await authController.register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ correo: 'test@example.com' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario registrado exitosamente' });
    });

    it('debería devolver error si falta un campo obligatorio', async () => {
      req.body.nombre = '';

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Nombre, correo y contraseña son obligatorios' });
    });

    it('debería devolver error si el correo ya está registrado', async () => {
      User.findOne.mockResolvedValue(true);

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'El correo ya está registrado' });
    });

  });

  describe('login', () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          correo: 'test@example.com',
          contrasena: 'password123'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      User.findOne.mockReset();
      bcrypt.compare.mockReset();
      jwt.sign.mockReset();
    });

    it('debería iniciar sesión correctamente con credenciales válidas', async () => {
      const fakeUser = {
        _id: '123',
        correo: 'test@example.com',
        contrasena: 'hashedpassword',
        rol: 'cliente',
        toObject: () => ({ _id: '123', correo: 'test@example.com', rol: 'cliente' })
      };

      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token123');

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ correo: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: 'Inicio de sesión exitoso',
        user: { _id: '123', correo: 'test@example.com', rol: 'cliente' },
        token: 'token123'
      });
    });

    it('debería devolver error si faltan correo o contraseña', async () => {
      req.body.correo = '';

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Correo y contraseña son requeridos.' });
    });

    it('debería devolver error si usuario no existe', async () => {
      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas' });
    });

    it('debería devolver error si la contraseña es incorrecta', async () => {
      const fakeUser = {
        contrasena: 'hashedpassword'
      };
      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas' });
    });

  });

});
