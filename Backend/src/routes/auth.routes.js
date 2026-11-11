const { Router } = require('express')
const { registro, login } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar.middleware')

const router = Router()

router.post(
  '/registro',
  validarCampos('nombre_usuario', 'apellido_usuario', 'direccion_usuario', 'email_usuario', 'contrasena_usuario'),
  registro
)
router.post('/login', validarCampos('email_usuario', 'contrasena_usuario'), login)

module.exports = router
