const { Router } = require('express')
const { eliminarImagen } = require('../controllers/publicaciones.controller')
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware')
const { validarIds } = require('../middlewares/validar.middleware')
const ROLES = require('../utils/roles')

const router = Router()

router.delete(
  '/:id_imgen_publicacion',
  verificarToken,
  verificarRol(ROLES.USUARIO, ROLES.ADMINISTRADOR),
  validarIds('id_imgen_publicacion'),
  eliminarImagen
)

module.exports = router
