const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const usuariosRoutes = require('./routes/usuarios.routes')
const publicacionesRoutes = require('./routes/publicaciones.routes')
const imagenesRoutes = require('./routes/imagenes.routes')
const carritoRoutes = require('./routes/carrito.routes')
const ubicacionRoutes = require('./routes/ubicacion.routes')
const categoriasRoutes = require('./routes/categorias.routes')
const { rutaNoEncontrada, manejarErrores } = require('./middlewares/error.middleware')
const { CARPETA_UPLOADS } = require('./middlewares/upload.middleware')

const app = express()

const origenesPermitidos = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origen) => origen.trim())
  : '*'
app.use(cors({ origin: origenesPermitidos }))
app.use(express.json())


app.use('/uploads', express.static(CARPETA_UPLOADS))

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Marketplace Arotopía funcionando' })
})

app.use('/auth', authRoutes)
app.use('/usuarios', usuariosRoutes)
app.use('/publicaciones', publicacionesRoutes)
app.use('/imagenes', imagenesRoutes)
app.use('/carrito', carritoRoutes)
app.use('/regiones', ubicacionRoutes)
app.use('/categorias', categoriasRoutes)

app.use(rutaNoEncontrada)
app.use(manejarErrores)

module.exports = app
