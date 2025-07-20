// Importamos jsonwebtoken para validar el token JWT
const jwt = require('jsonwebtoken');

// Exportamos la función middleware para verificar el token
module.exports = function verifyToken(req, res, next) {
  
  // Extraemos el token del header 'Authorization' que esperamos en formato "Bearer <token>"
  const token = req.header('Authorization')?.split(' ')[1];
  
  // Si no hay token, devolvemos un error 401 (no autorizado)
  if (!token) return res.status(401).json({ message: 'Acceso denegado. No token.' });

  try {
    // Verificamos el token usando la clave secreta (de .env o por defecto)
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
    
    // Guardamos el payload del token (datos del usuario) en req.user para usarlo luego
    req.user = verified;
    
    // Continuamos con la siguiente función/middleware
    next();
  } catch (error) {
    // Si el token no es válido o expiró, respondemos con error 400
    res.status(400).json({ message: 'Token no válido' });
  }
};
