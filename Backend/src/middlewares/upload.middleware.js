const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const CARPETA_UPLOADS = path.join(__dirname, '..', '..', 'uploads')
fs.mkdirSync(CARPETA_UPLOADS, { recursive: true })

const TIPOS_PERMITIDOS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
}

const TAMANO_MAXIMO_MB = 5

const almacenamiento = multer.diskStorage({
  destination: CARPETA_UPLOADS,
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${TIPOS_PERMITIDOS[file.mimetype]}`)
  },
})

const upload = multer({
  storage: almacenamiento,
  limits: { fileSize: TAMANO_MAXIMO_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (TIPOS_PERMITIDOS[file.mimetype]) {
      cb(null, true)
    } else {
      const error = new Error('Solo se permiten imágenes JPG, PNG, WEBP o GIF')
      error.status = 400
      cb(error)
    }
  },
})


const subirImagen = upload.single('imagen')

const urlDeArchivo = (archivo) => `/uploads/${archivo.filename}`

const borrarArchivo = (url) => {
  if (typeof url !== 'string' || !url.startsWith('/uploads/')) return
  const ruta = path.join(CARPETA_UPLOADS, path.basename(url))
  fs.promises.unlink(ruta).catch(() => {})
}

module.exports = {
  subirImagen,
  urlDeArchivo,
  borrarArchivo,
  CARPETA_UPLOADS,
  TAMANO_MAXIMO_MB,
}
