const { borrarArchivo, urlDeArchivo } = require('./upload.middleware')


const validarCampos = (...campos) => (req, res, next) => {
  const body = req.body || {}
  const faltantes = campos.filter(
    (campo) => body[campo] === undefined || body[campo] === null || String(body[campo]).trim() === ''
  )

  if (faltantes.length > 0) {
    if (req.file) borrarArchivo(urlDeArchivo(req.file))
    return res.status(400).json({ error: `Faltan campos obligatorios: ${faltantes.join(', ')}` })
  }
  next()
}


const validarIds = (...params) => (req, res, next) => {
  for (const param of params) {
    const valor = Number(req.params[param])
    if (!Number.isInteger(valor) || valor <= 0) {
      return res.status(400).json({ error: `El parámetro ${param} debe ser un número válido` })
    }
  }
  next()
}

module.exports = { validarCampos, validarIds }
