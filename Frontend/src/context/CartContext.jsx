import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosConfig'
import { useAuth } from './AuthContext'
import { urlImagen } from '../api/utils'

const CartContext = createContext()

const adaptarItem = (item) => ({
  id: item.id_detalle_carro,
  idPublicacion: item.id_publicacion,
  titulo: item.titulo_publicacion,
  precio: Number(item.valor_publicacion),
  cantidad: item.cantidad,
  subtotal: Number(item.subtotal),
  imagen: urlImagen(item.imagen),
})

export function CartProvider({ children }) {
  const { puedeComprar } = useAuth()
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(false)

   const carrito = puedeComprar ? items : []

  const obtenerCarrito = async () => {
    const { data } = await api.get('/carrito')
    return data.productos.map(adaptarItem)
  }

   useEffect(() => {
    if (!puedeComprar) return
    let activo = true
    obtenerCarrito()
      .then((lista) => activo && setItems(lista))
      .catch(() => activo && setItems([]))
    return () => {
      activo = false
    }
  }, [puedeComprar])

   const conCarga = async (accion) => {
    setCargando(true)
    try {
      await accion()
      setItems(await obtenerCarrito())
    } finally {
      setCargando(false)
    }
  }

  // POST /carrito (si ya existe, la API suma la cantidad)
  const agregarAlCarrito = (idPublicacion, cantidad) =>
    conCarga(() => api.post('/carrito', { id_publicacion: idPublicacion, cantidad }))

  // PATCH /carrito/:id_detalle_carro
  const actualizarCantidad = async (idDetalle, nuevaCantidad) => {
    if (nuevaCantidad < 1) return
    await conCarga(() => api.patch(`/carrito/${idDetalle}`, { cantidad: nuevaCantidad }))
  }

  // DELETE /carrito/:id_detalle_carro
  const eliminarDelCarrito = (idDetalle) =>
    conCarga(() => api.delete(`/carrito/${idDetalle}`))

  // DELETE /carrito/vaciar
  const vaciarCarrito = () => conCarga(() => api.delete('/carrito/vaciar'))

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        carrito,
        cargando,
        cantidadTotal,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}
