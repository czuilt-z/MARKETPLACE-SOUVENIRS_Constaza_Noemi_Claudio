const { Router } = require('express')
const usuarios = require('../controllers/usuarios.controller')
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware')
const { validarCampos, validarIds } = require('../middlewares/validar.middleware')
const ROLES = require('../utils/roles')

const router = Router()

router.use(verificarToken)

router.get('/', verificarRol(ROLES.ADMINISTRADOR), usuarios.listar)
router.get('/:id_usuario', validarIds('id_usuario'), usuarios.obtener)
router.put(
  '/:id_usuario',
  validarIds('id_usuario'),
  validarCampos('nombre_usuario', 'apellido_usuario', 'direccion_usuario', 'email_usuario'),
  usuarios.actualizar
)
router.patch(
  '/:id_usuario/rol',
  verificarRol(ROLES.ADMINISTRADOR),
  validarIds('id_usuario'),
  validarCampos('id_rol'),
  usuarios.actualizarRol
)
router.delete('/:id_usuario', verificarRol(ROLES.ADMINISTRADOR), validarIds('id_usuario'), usuarios.eliminar)

module.exports = router
