const pool = require('../config/db')

const obtenerOCrearCarro = async (idUsuario) => {
  const { rows } = await pool.query(
    `INSERT INTO Carro (id_usuario) VALUES ($1)
     ON CONFLICT (id_usuario) DO UPDATE SET id_usuario = EXCLUDED.id_usuario
     RETURNING id_carro`,
    [idUsuario]
  )
  return rows[0].id_carro
}

const obtenerProductos = async (idCarro) => {
  const { rows } = await pool.query(
    `SELECT d.id_detalle_carro, d.id_publicacion, p.titulo_publicacion,
            p.valor_publicacion::float AS valor_publicacion, d.cantidad,
            (p.valor_publicacion * d.cantidad)::float AS subtotal,
            (SELECT i.url_img FROM img_publicacion i
             WHERE i.id_publicacion = p.id_publicacion
             ORDER BY i.id_imgen_publicacion LIMIT 1) AS imagen
     FROM Detalle_carro d
     JOIN Publicacion p ON p.id_publicacion = d.id_publicacion
     WHERE d.id_carro = $1
     ORDER BY d.id_detalle_carro`,
    [idCarro]
  )
  return rows
}


const agregarProducto = async (idCarro, idPublicacion, cantidad) => {
  await pool.query(
    `INSERT INTO Detalle_carro (id_carro, id_publicacion, cantidad)
     VALUES ($1, $2, $3)
     ON CONFLICT (id_carro, id_publicacion)
     DO UPDATE SET cantidad = Detalle_carro.cantidad + EXCLUDED.cantidad`,
    [idCarro, idPublicacion, cantidad]
  )
}


const obtenerDetalle = async (idDetalle) => {
  const { rows } = await pool.query(
    `SELECT d.id_detalle_carro, d.id_carro, c.id_usuario
     FROM Detalle_carro d
     JOIN Carro c ON c.id_carro = d.id_carro
     WHERE d.id_detalle_carro = $1`,
    [idDetalle]
  )
  return rows[0]
}

const actualizarCantidad = async (idDetalle, cantidad) => {
  await pool.query(
    'UPDATE Detalle_carro SET cantidad = $1 WHERE id_detalle_carro = $2',
    [cantidad, idDetalle]
  )
}

const eliminarProducto = async (idDetalle) => {
  await pool.query('DELETE FROM Detalle_carro WHERE id_detalle_carro = $1', [idDetalle])
}

const vaciar = async (idCarro) => {
  await pool.query('DELETE FROM Detalle_carro WHERE id_carro = $1', [idCarro])
}

module.exports = {
  obtenerOCrearCarro,
  obtenerProductos,
  agregarProducto,
  obtenerDetalle,
  actualizarCantidad,
  eliminarProducto,
  vaciar,
}
