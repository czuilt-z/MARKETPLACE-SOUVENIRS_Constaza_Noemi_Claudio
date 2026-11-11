const Carrito = require('../models/carrito.model')
const Publicacion = require('../models/publicacion.model')
const { ErrorHttp } = require('../utils/errores')

const validarCantidad = (valor) => {
  const cantidad = Number(valor)
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new ErrorHttp(400, 'La cantidad debe ser un número entero mayor a 0')
  }
  return cantidad
}


const obtenerDetallePropio = async (req) => {
  const detalle = await Carrito.obtenerDetalle(Number(req.params.id_detalle_carro))
  if (!detalle || detalle.id_usuario !== req.usuario.id_usuario) {
    throw new ErrorHttp(404, 'Producto no encontrado en el carrito')
  }
  return detalle
}

// GET /carrito
const obtener = async (req, res) => {
  const id_carro = await Carrito.obtenerOCrearCarro(req.usuario.id_usuario)
  const productos = await Carrito.obtenerProductos(id_carro)
  res.json({ id_carro, productos })
}

// POST /carrito
const agregar = async (req, res) => {
  const cantidad = validarCantidad(req.body.cantidad ?? 1)
  const idPublicacion = Number(req.body.id_publicacion)

  const publicacion = await Publicacion.obtenerPorId(idPublicacion)
  if (!publicacion || publicacion.estado_publicacion !== 'activa') {
    return res.status(404).json({ error: 'Publicación no encontrada' })
  }
  // Como todos pueden vender, se evita comprar la publicación propia
  if (publicacion.id_usuario === req.usuario.id_usuario) {
    return res.status(400).json({ error: 'No puedes comprar tu propia publicación' })
  }
  if (publicacion.stock_publicacion < cantidad) {
    return res.status(400).json({ error: 'No hay stock suficiente para esa cantidad' })
  }

  const id_carro = await Carrito.obtenerOCrearCarro(req.usuario.id_usuario)
  await Carrito.agregarProducto(id_carro, idPublicacion, cantidad)
  res.status(201).json({ mensaje: 'Producto agregado al carrito correctamente' })
}

// PATCH /carrito/:id_detalle_carro
const actualizarCantidad = async (req, res) => {
  const cantidad = validarCantidad(req.body.cantidad)
  const detalle = await obtenerDetallePropio(req)
  await Carrito.actualizarCantidad(detalle.id_detalle_carro, cantidad)
  res.json({ mensaje: 'Cantidad actualizada correctamente' })
}

// DELETE /carrito/:id_detalle_carro
const eliminar = async (req, res) => {
  const detalle = await obtenerDetallePropio(req)
  await Carrito.eliminarProducto(detalle.id_detalle_carro)
  res.json({ mensaje: 'Producto eliminado del carrito correctamente' })
}

// DELETE /carrito/vaciar
const vaciar = async (req, res) => {
  const id_carro = await Carrito.obtenerOCrearCarro(req.usuario.id_usuario)
  await Carrito.vaciar(id_carro)
  res.json({ mensaje: 'Carrito vaciado correctamente' })
}

module.exports = { obtener, agregar, actualizarCantidad, eliminar, vaciar }
