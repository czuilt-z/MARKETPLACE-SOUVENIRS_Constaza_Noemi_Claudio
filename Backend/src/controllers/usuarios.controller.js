const Usuario = require('../models/usuario.model')
const ROLES = require('../utils/roles')


const esPropietarioOAdmin = (req, idUsuario) =>
  req.usuario.id_rol === ROLES.ADMINISTRADOR || req.usuario.id_usuario === idUsuario

// GET /usuarios
const listar = async (req, res) => {
  const usuarios = await Usuario.listar()
  res.json(usuarios)
}

// GET /usuarios/:id_usuario
const obtener = async (req, res) => {
  const id = Number(req.params.id_usuario)

  if (!esPropietarioOAdmin(req, id)) {
    return res.status(403).json({ error: 'No tiene permisos para ver este usuario' })
  }

  const usuario = await Usuario.obtenerPorId(id)
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }
  res.json(usuario)
}

// PUT /usuarios/:id_usuario
const actualizar = async (req, res) => {
  const id = Number(req.params.id_usuario)

  if (!esPropietarioOAdmin(req, id)) {
    return res.status(403).json({ error: 'No tiene permisos para modificar este usuario' })
  }

  const actualizados = await Usuario.actualizar(id, req.body)
  if (!actualizados) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }
  res.json({ mensaje: 'Usuario actualizado correctamente' })
}

// PATCH /usuarios/:id_usuario/rol
const actualizarRol = async (req, res) => {
  const id = Number(req.params.id_usuario)
  const idRol = Number(req.body.id_rol)

  if (!Object.values(ROLES).includes(idRol)) {
    return res.status(400).json({ error: 'Rol inválido' })
  }

  const actualizados = await Usuario.actualizarRol(id, idRol)
  if (!actualizados) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }
  res.json({ mensaje: 'Rol actualizado correctamente' })
}

// DELETE /usuarios/:id_usuario
const eliminar = async (req, res) => {
  const eliminados = await Usuario.eliminar(Number(req.params.id_usuario))
  if (!eliminados) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }
  res.json({ mensaje: 'Usuario eliminado correctamente' })
}

module.exports = { listar, obtener, actualizar, actualizarRol, eliminar }
