const pool = require('../config/db')

const CAMPOS_PUBLICOS = `id_usuario, nombre_usuario, apellido_usuario, direccion_usuario,
  email_usuario, telefono_usuario, id_rol, id_comuna, fecha_registro`

const crear = async (usuario) => {
  const consulta = `
    INSERT INTO Usuario (nombre_usuario, apellido_usuario, direccion_usuario, email_usuario,
                         contrasena_usuario, telefono_usuario, id_rol, id_comuna)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id_usuario`
  const valores = [
    usuario.nombre_usuario,
    usuario.apellido_usuario,
    usuario.direccion_usuario,
    usuario.email_usuario,
    usuario.contrasena_usuario,
    usuario.telefono_usuario || null,
    usuario.id_rol,
    usuario.id_comuna || null,
  ]
  const { rows } = await pool.query(consulta, valores)
  return rows[0].id_usuario
}


const buscarPorEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT * FROM Usuario WHERE email_usuario = $1',
    [email]
  )
  return rows[0]
}

const listar = async () => {
  const { rows } = await pool.query(
    `SELECT ${CAMPOS_PUBLICOS} FROM Usuario ORDER BY id_usuario`
  )
  return rows
}

const obtenerPorId = async (id) => {
  const { rows } = await pool.query(
    `SELECT ${CAMPOS_PUBLICOS} FROM Usuario WHERE id_usuario = $1`,
    [id]
  )
  return rows[0]
}

const actualizar = async (id, datos) => {
  const consulta = `
    UPDATE Usuario SET
      nombre_usuario = $1,
      apellido_usuario = $2,
      direccion_usuario = $3,
      email_usuario = $4,
      telefono_usuario = $5,
      id_comuna = $6
    WHERE id_usuario = $7`
  const valores = [
    datos.nombre_usuario,
    datos.apellido_usuario,
    datos.direccion_usuario,
    datos.email_usuario,
    datos.telefono_usuario || null,
    datos.id_comuna || null,
    id,
  ]
  const { rowCount } = await pool.query(consulta, valores)
  return rowCount
}

const actualizarRol = async (id, idRol) => {
  const { rowCount } = await pool.query(
    'UPDATE Usuario SET id_rol = $1 WHERE id_usuario = $2',
    [idRol, id]
  )
  return rowCount
}


const eliminar = async (id) => {
  const cliente = await pool.connect()
  try {
    await cliente.query('BEGIN')
    await cliente.query('DELETE FROM Carro WHERE id_usuario = $1', [id])
    await cliente.query(
      `DELETE FROM Detalle_carro WHERE id_publicacion IN
        (SELECT id_publicacion FROM Publicacion WHERE id_usuario = $1)`,
      [id]
    )
    await cliente.query('DELETE FROM Publicacion WHERE id_usuario = $1', [id])
    const { rowCount } = await cliente.query('DELETE FROM Usuario WHERE id_usuario = $1', [id])
    await cliente.query('COMMIT')
    return rowCount
  } catch (error) {
    await cliente.query('ROLLBACK')
    throw error
  } finally {
    cliente.release()
  }
}

module.exports = { crear, buscarPorEmail, listar, obtenerPorId, actualizar, actualizarRol, eliminar }
