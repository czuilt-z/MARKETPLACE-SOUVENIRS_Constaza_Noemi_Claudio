import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { productos } from '../data/productos'
import { useCart } from '../context/CartContext'

function ProductDetail() {

  const { agregarAlCarrito } = useCart()
  const [cantidad, setCantidad] = useState(1)

  const { id } = useParams()

  const producto = productos.find(
    (item) => item.id === Number(id)
  )

  if (!producto) {
  return (
    <div className="container py-5 text-center">
      <h2>Producto no encontrado</h2>
      <p>Lo sentimos, el producto que buscas no está disponible :C.</p>
    </div>
  )
  }

  
return (
  <main className="container py-5">
    <div className="row g-5 align-items-center">

      <div className="col-md-6">
        <img
          src={producto.imagen}
          alt={producto.titulo}
          className="img-fluid rounded shadow-sm w-100"
          style={{
            maxHeight: '500px',
            objectFit: 'contain',
            backgroundColor: '#FFF9F5',
          }}
        />
      </div>

      <div className="col-md-6">

        <h2
          className="fw-bold"
          style={{ color: '#67434A' }}
        >
          {producto.titulo}
        </h2>

        <p className="text-muted">
          {producto.descripcion}
        </p>

        <h3
          className="fw-bold my-4"
          style={{ color: '#67434A' }}
        >
          ${producto.precio.toLocaleString('es-CL')}
        </h3>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Cantidad
          </label>

          <input
            type="number"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
            style={{ maxWidth: '120px' }}
          />
        </div>

        <button
          className="btn btn-arotopia"
          onClick={() => agregarAlCarrito(producto, cantidad)}
        >
          Agregar al carrito
        </button>

      </div>
    </div>
  </main>
  )
}

export default ProductDetail