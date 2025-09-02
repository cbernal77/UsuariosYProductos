const userController = require('../../controllers/user.controller');
const User = require('../../models/user');

jest.mock('../../models/user'); // Simula el modelo User

describe('user.controller', () => {

  describe('getUsers', () => {
    it('debe devolver los usuarios sin la contraseña', async () => {
      const fakeUsers = [{ nombre: 'Juan', correo: 'juan@test.com' }];
      const mockSelect = jest.fn().mockResolvedValue(fakeUsers);
      User.find.mockReturnValue({ select: mockSelect });

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.getUsers(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(mockSelect).toHaveBeenCalledWith('-contrasena');
      expect(res.json).toHaveBeenCalledWith(fakeUsers);
    });

    it('debe manejar errores y responder con 500', async () => {
      const error = new Error('DB error');
      const mockSelect = jest.fn().mockRejectedValue(error);
      User.find.mockReturnValue({ select: mockSelect });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario existente', async () => {
      const fakeUser = {
        nombre: 'Old Name',
        correo: 'old@mail.com',
        rol: 'user',
        save: jest.fn().mockResolvedValue(),
        toObject: () => ({
          nombre: 'New Name',
          correo: 'new@mail.com',
          rol: 'admin',
        }),
      };

      User.findById.mockResolvedValue(fakeUser);

      const req = {
        params: { id: '123' },
        body: { nombre: 'New Name', correo: 'new@mail.com', rol: 'admin' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.updateUser(req, res);

      expect(User.findById).toHaveBeenCalledWith('123');
      expect(fakeUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: 'Usuario actualizado',
        user: {
          nombre: 'New Name',
          correo: 'new@mail.com',
          rol: 'admin',
        },
      });
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      User.findById.mockResolvedValue(null);

      const req = { params: { id: '999' }, body: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('debe manejar errores y devolver 400', async () => {
      User.findById.mockRejectedValue(new Error('Error DB'));

      const req = { params: { id: '123' }, body: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error DB' });
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario existente', async () => {
      User.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      const req = { params: { id: '123' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado' });
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: '999' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
    });

    it('debe manejar errores y devolver 500', async () => {
      User.findByIdAndDelete.mockRejectedValue(new Error('Error grave'));

      const req = { params: { id: '123' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error grave' });
    });
  });

});
