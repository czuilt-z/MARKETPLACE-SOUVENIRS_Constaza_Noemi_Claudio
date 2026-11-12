const { Router } = require('express')
const carrito = require('../controllers/carrito.controller')
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware')
const { validarCampos, validarIds } = require('../middlewares/validar.middleware')
const ROLES = require('../utils/roles')

const router = Router()

router.use(verificarToken, verificarRol(ROLES.USUARIO, ROLES.ADMINISTRADOR))

router.get('/', carrito.obtener)
router.post('/', validarCampos('id_publicacion'), carrito.agregar)

router.delete('/vaciar', carrito.vaciar)

router.patch('/:id_detalle_carro', validarIds('id_detalle_carro'), validarCampos('cantidad'), carrito.actualizarCantidad)
router.delete('/:id_detalle_carro', validarIds('id_detalle_carro'), carrito.eliminar)

module.exports = router
