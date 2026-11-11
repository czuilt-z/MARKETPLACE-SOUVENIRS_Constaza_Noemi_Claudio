import { useCallback, useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import { adaptarPublicacion, mensajeError } from '../api/utils'

export function usePublicaciones(filtros = {}) {
  const [publicaciones, setPublicaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

    const [version, setVersion] = useState(0)
  const recargar = useCallback(() => setVersion((v) => v + 1), [])

  const { id_categoria, busqueda, id_usuario } = filtros

  useEffect(() => {
    let activo = true

    const cargar = async () => {
      try {
        const params = {}
        if (id_categoria) params.id_categoria = id_categoria
        if (busqueda) params.busqueda = busqueda
        if (id_usuario) params.id_usuario = id_usuario

        const { data } = await api.get('/publicaciones', { params })
        if (!activo) return
        setPublicaciones(data.map(adaptarPublicacion))
        setError('')
      } catch (err) {
        if (activo) setError(mensajeError(err, 'No se pudieron cargar los productos.'))
      } finally {
        if (activo) setCargando(false)
      }
    }
    cargar()

    return () => {
      activo = false
    }
  }, [id_categoria, busqueda, id_usuario, version])

  return { publicaciones, cargando, error, recargar }
}

// GET /publicaciones/:id
export function usePublicacion(id) {
  const [publicacion, setPublicacion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get(`/publicaciones/${id}`)
        setPublicacion(adaptarPublicacion(data))
        setError('')
      } catch (err) {
        setPublicacion(null)
        setError(mensajeError(err, 'Producto no encontrado.'))
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  return { publicacion, cargando, error }
}

// GET /categorias
export function useCategorias() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    api.get('/categorias')
      .then(({ data }) => setCategorias(data))
      .catch(() => setCategorias([]))
  }, [])

  return categorias
}
