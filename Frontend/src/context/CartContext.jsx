
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((carritoActual) => {
      const productoExiste = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExiste) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }

      return [...carritoActual, { ...producto, cantidad }]
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    )
  }

  const actualizarCantidad = (id, nuevaCantidad) => {
  if (nuevaCantidad < 1) return
  setCarrito((carritoActual) =>
    carritoActual.map((item) =>
      item.id === id
        ? { ...item, cantidad: nuevaCantidad }
        : item
      )
    )
  }

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
