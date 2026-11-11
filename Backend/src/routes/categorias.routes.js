const { Router } = require('express')
const pool = require('../config/db')

const router = Router()

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id_categoria, categoria, descripcion FROM Categoria ORDER BY id_categoria'
  )
  res.json(rows)
})

module.exports = router
