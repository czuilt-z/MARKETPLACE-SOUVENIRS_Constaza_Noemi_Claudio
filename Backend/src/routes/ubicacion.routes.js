const { Router } = require('express')
const { listarRegiones, listarComunas } = require('../controllers/ubicacion.controller')
const { validarIds } = require('../middlewares/validar.middleware')

const router = Router()

router.get('/', listarRegiones)
router.get('/:id_region/comunas', validarIds('id_region'), listarComunas)

module.exports = router
