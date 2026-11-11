const pool = require('../config/db')

const listarRegiones = async () => {
  const { rows } = await pool.query(
    'SELECT id_region, nombre_region FROM Region ORDER BY id_region'
  )
  return rows
}

const obtenerRegion = async (idRegion) => {
  const { rows } = await pool.query(
    'SELECT id_region, nombre_region FROM Region WHERE id_region = $1',
    [idRegion]
  )
  return rows[0]
}

const listarComunas = async (idRegion) => {
  const { rows } = await pool.query(
    'SELECT id_comuna, nombre_comuna, id_region FROM Comuna WHERE id_region = $1 ORDER BY nombre_comuna',
    [idRegion]
  )
  return rows
}

module.exports = { listarRegiones, obtenerRegion, listarComunas }
