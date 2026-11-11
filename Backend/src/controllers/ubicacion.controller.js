const Ubicacion = require('../models/ubicacion.model')

// GET /regiones
const listarRegiones = async (req, res) => {
  const regiones = await Ubicacion.listarRegiones()
  res.json(regiones)
}

// GET /regiones/:id_region/comunas
const listarComunas = async (req, res) => {
  const idRegion = Number(req.params.id_region)

  const region = await Ubicacion.obtenerRegion(idRegion)
  if (!region) {
    return res.status(404).json({ error: 'Región no encontrada' })
  }

  const comunas = await Ubicacion.listarComunas(idRegion)
  res.json(comunas)
}

module.exports = { listarRegiones, listarComunas }
