const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario.model')
const { generarToken } = require('../utils/jwt')
const ROLES = require('../utils/roles')

// POST /auth/registro
const registro = async (req, res) => {
  const { email_usuario, contrasena_usuario } = req.body
  if (req.body.id_rol !== undefined && Number(req.body.id_rol) !== ROLES.USUARIO) {
    return res.status(400).json({ error: 'No se puede registrar una cuenta de administrador' })
  }
  const id_rol = ROLES.USUARIO

  if (String(contrasena_usuario).length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  }

  const existe = await Usuario.buscarPorEmail(email_usuario)
  if (existe) {
    return res.status(400).json({ error: 'El email ya está registrado' })
  }

  const contrasenaEncriptada = await bcrypt.hash(String(contrasena_usuario), 10)
  const id_usuario = await Usuario.crear({
    ...req.body,
    id_rol,
    contrasena_usuario: contrasenaEncriptada,
  })

  res.status(201).json({ mensaje: 'Usuario registrado correctamente', id_usuario })
}

// POST /auth/login
const login = async (req, res) => {
  const { email_usuario, contrasena_usuario } = req.body

  const usuario = await Usuario.buscarPorEmail(email_usuario)
  const contrasenaValida =
    usuario && (await bcrypt.compare(String(contrasena_usuario), usuario.contrasena_usuario))

  if (!contrasenaValida) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }

  res.json({
    mensaje: 'Inicio de sesión exitoso',
    token: generarToken(usuario),
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre_usuario: usuario.nombre_usuario,
      id_rol: usuario.id_rol,
    },
  })
}

module.exports = { registro, login }
