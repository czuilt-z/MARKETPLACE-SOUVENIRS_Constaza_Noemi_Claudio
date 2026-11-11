import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'


// (GET /regiones y GET /regiones/:id_region/comunas)
export function useUbicacion() {
  const [regiones, setRegiones] = useState([])
  const [comunas, setComunas] = useState([])

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data: listaRegiones } = await api.get('/regiones')
        const respuestas = await Promise.all(
          listaRegiones.map((r) => api.get(`/regiones/${r.id_region}/comunas`))
        )
        setRegiones(listaRegiones)
        setComunas(respuestas.flatMap((r) => r.data))
      } catch {
        setRegiones([])
        setComunas([])
      }
    }
    cargar()
  }, [])

  const comunasDeRegion = (idRegion) =>
    comunas.filter((c) => c.id_region === Number(idRegion))

  const regionDeComuna = (idComuna) =>
    comunas.find((c) => c.id_comuna === Number(idComuna))?.id_region || ''

  return { regiones, comunasDeRegion, regionDeComuna }
}
