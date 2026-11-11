const { Router } = require('express')
const publicaciones = require('../controllers/publicaciones.controller')
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware')
const { validarCampos, validarIds } = require('../middlewares/validar.middleware')
const { subirImagen } = require('../middlewares/upload.middleware')
const ROLES = require('../utils/roles')

const router = Router()

const CAMPOS_PUBLICACION = ['titulo_publicacion', 'valor_publicacion', 'id_categoria']
const PUEDE_PUBLICAR = [ROLES.USUARIO, ROLES.ADMINISTRADOR]

router.get('/', publicaciones.listar)
router.get('/:id_publicacion', validarIds('id_publicacion'), publicaciones.obtener)

router.post(
  '/',
  verificarToken,
  verificarRol(...PUEDE_PUBLICAR),
  subirImagen,
  validarCampos(...CAMPOS_PUBLICACION),
  publicaciones.crear
)
router.put(
  '/:id_publicacion',
  verificarToken,
  verificarRol(...PUEDE_PUBLICAR),
  validarIds('id_publicacion'),
  validarCampos(...CAMPOS_PUBLICACION),
  publicaciones.actualizar
)
router.delete(
  '/:id_publicacion',
  verificarToken,
  verificarRol(...PUEDE_PUBLICAR),
  validarIds('id_publicacion'),
  publicaciones.eliminar
)

router.post(
  '/:id_publicacion/imagenes',
  verificarToken,
  verificarRol(...PUEDE_PUBLICAR),
  validarIds('id_publicacion'),
  subirImagen,
  publicaciones.agregarImagen
)

module.exports = router
