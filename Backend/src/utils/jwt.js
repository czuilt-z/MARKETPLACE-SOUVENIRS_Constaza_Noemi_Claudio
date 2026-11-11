const jwt = require('jsonwebtoken')

const SECRET = () => process.env.JWT_SECRET || 'clave_secreta_desarrollo'

const generarToken = (usuario) =>
  jwt.sign(
    { id_usuario: usuario.id_usuario, id_rol: usuario.id_rol },
    SECRET(),
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  )

const verificarJWT = (token) => jwt.verify(token, SECRET())

module.exports = { generarToken, verificarJWT }
