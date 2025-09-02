// tests/controllers/product.controller.test.js

const productController = require('../../controllers/product.controller');
const Product = require('../../models/product');

jest.mock('../../models/product'); // Simula el modelo Product

describe('product.controller', () => {
  describe('getProducts', () => {
    it('debe devolver los productos correctamente', async () => {
      const productosMock = [{ name: 'Producto 1' }, { name: 'Producto 2' }];
      Product.find.mockResolvedValue(productosMock);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await productController.getProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(productosMock);
    });

    it('debe manejar errores y responder con 500', async () => {
      Product.find.mockRejectedValue(new Error('DB Error'));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener productos' });
    });
  });

  // Agrega más pruebas según funciones del controlador
});
