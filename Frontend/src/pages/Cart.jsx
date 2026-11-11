import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import EstadoCarga from '../components/EstadoCarga'
import { formatearPrecio, mensajeError } from '../api/utils'

function Cart() {
  const { carrito, cargando, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = useCart()
  const [error, setError] = useState('')

   const ejecutar = async (accion) => {
    try {
      setError('')
      await accion()
    } catch (err) {
      setError(mensajeError(err))
    }
  }

  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.subtotal,
    0
  )

  return (
  <main className="container py-5">
    <h2 className="fw-bold mb-4" style={{ color: '#67434A' }}>
      Mi carrito
    </h2>

    {error && <div className="alert alert-danger py-2">{error}</div>}

    <EstadoCarga cargando={cargando && carrito.length === 0}>
    {carrito.length === 0 ? (
      <div className="text-center py-5">
        <h5 style={{ color: '#67434A' }}>
          Tu carrito está vacío.
        </h5>
        <p className="text-muted">
          ¡Explora nuestros productos y encuentra algo especial!
        </p>
        <Link to="/productos" className="btn btn-arotopia">Ver productos</Link>
      </div>
    ) : (
      <>
        {carrito.map((producto) => (
          <div className="card shadow-sm mb-3" key={producto.id}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className="img-fluid rounded"
                    style={{
                      height: '140px',
                      width: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                <div className="col-md-5">
                  <Link to={`/productos/${producto.idPublicacion}`} className="text-decoration-none">
                    <h5 className="fw-bold" style={{ color: '#67434A' }}>
                      {producto.titulo}
                    </h5>
                  </Link>
                  <p className="text-muted mb-1">
                    {formatearPrecio(producto.precio)} c/u
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <span className="fw-semibold">Cantidad:</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        ejecutar(() => actualizarCantidad(producto.id, producto.cantidad - 1))
                      }
                      disabled={producto.cantidad <= 1 || cargando}
                    >
                      −
                    </button>

                    <span className="fw-semibold">
                      {producto.cantidad}
                    </span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        ejecutar(() => actualizarCantidad(producto.id, producto.cantidad + 1))
                      }
                      disabled={cargando}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-md-2">
                  <p className="fw-bold mb-0" style={{ color: '#67434A' }}>
                    {formatearPrecio(producto.subtotal)}
                  </p>
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => ejecutar(() => eliminarDelCarrito(producto.id))}
                    disabled={cargando}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between align-items-end mt-4">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              if (window.confirm('¿Vaciar todo el carrito?')) ejecutar(vaciarCarrito)
            }}
            disabled={cargando}
          >
            Vaciar carrito
          </button>

          <div className="text-end">
            <h5 className="fw-bold" style={{ color: '#67434A' }}>
              Total: {formatearPrecio(total)}
            </h5>
            <button className="btn btn-arotopia mt-2">
              Continuar compra
            </button>
          </div>
        </div>
      </>
    )}
    </EstadoCarga>
  </main>
 )
}
export default Cart
