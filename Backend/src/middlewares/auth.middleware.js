const { verificarJWT } = require('../utils/jwt')

const verificarToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  const token = authorization.split(' ')[1]

  try {
    req.usuario = verificarJWT(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

const verificarRol = (...rolesPermitidos) => (req, res, next) => {
  if (!rolesPermitidos.includes(req.usuario?.id_rol)) {
    return res.status(403).json({ error: 'No tiene permisos para esta acción' })
  }
  next()
}

module.exports = { verificarToken, verificarRol }
