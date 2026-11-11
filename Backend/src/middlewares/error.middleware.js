const { TAMANO_MAXIMO_MB } = require('./upload.middleware')

const rutaNoEncontrada = (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
}


const manejarErrores = (err, req, res, next) => {

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' })
  }

  if (err.name === 'MulterError') {
    const mensaje = err.code === 'LIMIT_FILE_SIZE'
      ? `La imagen no puede pesar más de ${TAMANO_MAXIMO_MB} MB`
      : 'Error al subir la imagen'
    return res.status(400).json({ error: mensaje })
  }

 
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }


  if (err.code === '23505') {
    return res.status(400).json({ error: 'El registro ya existe' })
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Hace referencia a un registro que no existe' })
  }
  if (err.code === '23514' || err.code === '22P02') {
    return res.status(400).json({ error: 'Datos inválidos' })
  }

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}

module.exports = { rutaNoEncontrada, manejarErrores }
