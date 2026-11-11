const Publicacion = require('../models/publicacion.model')
const ROLES = require('../utils/roles')
const { ErrorHttp } = require('../utils/errores')
const { urlDeArchivo, borrarArchivo } = require('../middlewares/upload.middleware')

const obtenerPublicacionPropia = async (req, idPublicacion) => {
  const publicacion = await Publicacion.obtenerPorId(idPublicacion)

  if (!publicacion) {
    throw new ErrorHttp(404, 'Publicación no encontrada')
  }
  if (req.usuario.id_rol !== ROLES.ADMINISTRADOR && publicacion.id_usuario !== req.usuario.id_usuario) {
    throw new ErrorHttp(403, 'No tiene permisos sobre esta publicación')
  }
  return publicacion
}

const validarValores = (body) => {
  if (Number(body.valor_publicacion) < 0 || Number.isNaN(Number(body.valor_publicacion))) {
    throw new ErrorHttp(400, 'El valor debe ser un número mayor o igual a 0')
  }
  if (body.stock_publicacion !== undefined && (Number(body.stock_publicacion) < 0 || Number.isNaN(Number(body.stock_publicacion)))) {
    throw new ErrorHttp(400, 'El stock debe ser un número mayor o igual a 0')
  }
}

// GET /publicaciones?id_categoria=&busqueda=&id_usuario=
const listar = async (req, res) => {
  const { id_categoria, busqueda, id_usuario } = req.query
  const publicaciones = await Publicacion.listar({ id_categoria, busqueda, id_usuario })
  res.json(publicaciones)
}

// GET /publicaciones/:id_publicacion
const obtener = async (req, res) => {
  const publicacion = await Publicacion.obtenerPorId(Number(req.params.id_publicacion))
  if (!publicacion) {
    return res.status(404).json({ error: 'Publicación no encontrada' })
  }
  res.json(publicacion)
}

// POST /publicaciones 
const crear = async (req, res) => {

    const imagenes = req.file ? [urlDeArchivo(req.file)] : req.body.imagenes

  try {
    validarValores(req.body)
    const id_publicacion = await Publicacion.crear({ ...req.body, imagenes }, req.usuario.id_usuario)
    res.status(201).json({ mensaje: 'Publicación creada correctamente', id_publicacion })
  } catch (error) {
    
    if (req.file) borrarArchivo(urlDeArchivo(req.file))
    throw error
  }
}

// PUT /publicaciones/:id_publicacion
const actualizar = async (req, res) => {
  const id = Number(req.params.id_publicacion)
  await obtenerPublicacionPropia(req, id)
  validarValores(req.body)
  await Publicacion.actualizar(id, req.body)
  res.json({ mensaje: 'Publicación actualizada correctamente' })
}

// DELETE /publicaciones/:id_publicacion
const eliminar = async (req, res) => {
  const id = Number(req.params.id_publicacion)
  await obtenerPublicacionPropia(req, id)
  await Publicacion.eliminar(id)
  res.json({ mensaje: 'Publicación eliminada correctamente' })
}

// POST /publicaciones/:id_publicacion/imagenes
const agregarImagen = async (req, res) => {
  const id = Number(req.params.id_publicacion)
  const url = req.file ? urlDeArchivo(req.file) : req.body?.url_img

  try {
    if (!url || !String(url).trim()) {
      throw new ErrorHttp(400, 'Debes enviar un archivo "imagen" o una "url_img"')
    }
    await obtenerPublicacionPropia(req, id)
    const id_imgen_publicacion = await Publicacion.agregarImagen(id, url)
    res.status(201).json({
      mensaje: 'Imagen agregada correctamente',
      id_imgen_publicacion,
      url_img: url,
    })
  } catch (error) {
    if (req.file) borrarArchivo(url)
    throw error
  }
}

// DELETE /imagenes/:id_imgen_publicacion
const eliminarImagen = async (req, res) => {
  const id = Number(req.params.id_imgen_publicacion)
  const imagen = await Publicacion.obtenerImagen(id)

  if (!imagen) {
    return res.status(404).json({ error: 'Imagen no encontrada' })
  }
  if (req.usuario.id_rol !== ROLES.ADMINISTRADOR && imagen.id_usuario !== req.usuario.id_usuario) {
    return res.status(403).json({ error: 'No tiene permisos sobre esta imagen' })
  }

  await Publicacion.eliminarImagen(id)
  borrarArchivo(imagen.url_img)
  res.json({ mensaje: 'Imagen eliminada correctamente' })
}

module.exports = { listar, obtener, crear, actualizar, eliminar, agregarImagen, eliminarImagen }
