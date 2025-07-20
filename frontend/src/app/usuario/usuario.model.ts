
// Definición de la interfaz Usuario, que describe la forma de un objeto usuario
export interface Usuario {

  // Identificador único del usuario. Es opcional porque puede no estar presente en el cliente hasta que se cree.
  id?: string;   

  // Alternativamente, si estás usando MongoDB, podrías tener un campo _id en lugar de id.
  // _id?: string; // Descomenta si tu backend devuelve _id y prefieres usarlo

  // Nombre completo del usuario
  nombre: string;

  // Correo electrónico del usuario, utilizado como identificador de inicio de sesión
  correo: string;

  // Contraseña del usuario. Es opcional por seguridad (por ejemplo, al mostrar usuarios en pantalla no necesitas mostrarla)
  contrasena?: string;

  // Rol que define los permisos del usuario: puede ser 'admin' o 'cliente'
  rol: 'admin' | 'cliente';
}
