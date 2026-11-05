import { useCart } from '../context/CartContext'

function Cart() {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCart()

  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  )

  return (
  <main className="container py-5">
    <h2 className="fw-bold mb-4" style={{ color: '#67434A' }}>
      Mi carrito
    </h2>

    {carrito.length === 0 ? (
      <div className="text-center py-5">
        <h5 style={{ color: '#67434A' }}>
          Tu carrito está vacío.
        </h5>
        <p className="text-muted">
          ¡Explora nuestros productos y encuentra algo especial!
        </p>
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
                  <h5 className="fw-bold" style={{ color: '#67434A' }}>
                    {producto.titulo}
                  </h5>
                  <p className="text-muted mb-1">
                    {producto.descripcion}
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <span className="fw-semibold">Cantidad:</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad - 1)
                      }
                      disabled={producto.cantidad <= 1}
                    >
                      −
                    </button>

                    <span className="fw-semibold">
                      {producto.cantidad}
                    </span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-md-2">
                  <p className="fw-bold mb-0" style={{ color: '#67434A' }}>
                    ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                  </p>
                </div>

                <div className="col-md-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarDelCarrito(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-end mt-4">
          <div className="text-end">
            <h5 className="fw-bold" style={{ color: '#67434A' }}>
              Total: ${total.toLocaleString('es-CL')}
            </h5>
            <button className="btn btn-arotopia mt-2">
              Continuar compra
            </button>
          </div>
        </div>
      </>
    )}
  </main>
 )
}
export default Cart