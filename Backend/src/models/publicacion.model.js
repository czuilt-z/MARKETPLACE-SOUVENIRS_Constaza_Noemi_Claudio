const format = require('pg-format')
const pool = require('../config/db')

const SELECT_PUBLICACION = `
  SELECT p.id_publicacion, p.titulo_publicacion, p.descripcion_publicacion,
         p.valor_publicacion::float AS valor_publicacion, p.stock_publicacion,
         p.estado_publicacion, p.id_usuario, p.id_categoria,
         COALESCE(
           json_agg(json_build_object(
             'id_imgen_publicacion', i.id_imgen_publicacion,
             'url_img', i.url_img
           ) ORDER BY i.id_imgen_publicacion) FILTER (WHERE i.id_imgen_publicacion IS NOT NULL),
           '[]'
         ) AS imagenes
  FROM Publicacion p
  LEFT JOIN img_publicacion i ON i.id_publicacion = p.id_publicacion`

const listar = async ({ id_categoria, busqueda, id_usuario } = {}) => {
  const filtros = [format('p.estado_publicacion = %L', 'activa')]

  if (id_categoria) filtros.push(format('p.id_categoria = %L', id_categoria))
  if (id_usuario) filtros.push(format('p.id_usuario = %L', id_usuario))
  if (busqueda) {
    const texto = `%${busqueda}%`
    filtros.push(format('(p.titulo_publicacion ILIKE %L OR p.descripcion_publicacion ILIKE %L)', texto, texto))
  }

  const consulta = `${SELECT_PUBLICACION}
    WHERE ${filtros.join(' AND ')}
    GROUP BY p.id_publicacion
    ORDER BY p.fecha_creacion DESC`

  const { rows } = await pool.query(consulta)
  return rows
}


const obtenerPorId = async (id) => {
  const { rows } = await pool.query(
    `${SELECT_PUBLICACION}
     WHERE p.id_publicacion = $1 AND p.estado_publicacion <> 'eliminada'
     GROUP BY p.id_publicacion`,
    [id]
  )
  return rows[0]
}

const crear = async (datos, idUsuario) => {
  const cliente = await pool.connect()
  try {
    await cliente.query('BEGIN')

    const { rows } = await cliente.query(
      `INSERT INTO Publicacion (titulo_publicacion, descripcion_publicacion, valor_publicacion,
                                stock_publicacion, id_usuario, id_categoria)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_publicacion`,
      [
        datos.titulo_publicacion,
        datos.descripcion_publicacion || null,
        datos.valor_publicacion,
        datos.stock_publicacion ?? 0,
        idUsuario,
        datos.id_categoria,
      ]
    )
    const idPublicacion = rows[0].id_publicacion

    const imagenes = Array.isArray(datos.imagenes) ? datos.imagenes.filter(Boolean) : []
    if (imagenes.length > 0) {
      const valores = imagenes.map((url) => [idPublicacion, url])
      await cliente.query(format('INSERT INTO img_publicacion (id_publicacion, url_img) VALUES %L', valores))
    }

    await cliente.query('COMMIT')
    return idPublicacion
  } catch (error) {
    await cliente.query('ROLLBACK')
    throw error
  } finally {
    cliente.release()
  }
}

const actualizar = async (id, datos) => {
  const { rowCount } = await pool.query(
    `UPDATE Publicacion SET
       titulo_publicacion = $1,
       descripcion_publicacion = $2,
       valor_publicacion = $3,
       stock_publicacion = $4,
       id_categoria = $5,
       fecha_actualizacion = CURRENT_TIMESTAMP
     WHERE id_publicacion = $6`,
    [
      datos.titulo_publicacion,
      datos.descripcion_publicacion || null,
      datos.valor_publicacion,
      datos.stock_publicacion ?? 0,
      datos.id_categoria,
      id,
    ]
  )
  return rowCount
}

const eliminar = async (id) => {
  const { rowCount } = await pool.query(
    `UPDATE Publicacion SET estado_publicacion = 'eliminada', fecha_actualizacion = CURRENT_TIMESTAMP
     WHERE id_publicacion = $1`,
    [id]
  )
  return rowCount
}

const agregarImagen = async (idPublicacion, url) => {
  const { rows } = await pool.query(
    'INSERT INTO img_publicacion (id_publicacion, url_img) VALUES ($1, $2) RETURNING id_imgen_publicacion',
    [idPublicacion, url]
  )
  return rows[0].id_imgen_publicacion
}

const obtenerImagen = async (idImagen) => {
  const { rows } = await pool.query(
    `SELECT i.id_imgen_publicacion, i.id_publicacion, i.url_img, p.id_usuario
     FROM img_publicacion i
     JOIN Publicacion p ON p.id_publicacion = i.id_publicacion
     WHERE i.id_imgen_publicacion = $1`,
    [idImagen]
  )
  return rows[0]
}

const eliminarImagen = async (idImagen) => {
  const { rowCount } = await pool.query(
    'DELETE FROM img_publicacion WHERE id_imgen_publicacion = $1',
    [idImagen]
  )
  return rowCount
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  agregarImagen,
  obtenerImagen,
  eliminarImagen,
}
