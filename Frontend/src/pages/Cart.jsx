function Cart() {
  return (
    <div className="container py-5">
      <h2 className="text-primary fw-bold mb-4">Mi carrito</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src="https://placehold.co/200x150"
                alt="Producto"
                className="img-fluid rounded"
              />
            </div>

            <div className="col-md-5">
              <h5>Nombre del producto</h5>
              <p className="text-muted mb-0">Descripción breve del producto</p>
            </div>

            <div className="col-md-2">
              <p className="fw-bold">$15.000</p>
            </div>

            <div className="col-md-2">
              <button className="btn btn-outline-danger btn-sm">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <div className="text-end">
          <h5>Total: $15.000</h5>
          <button className="btn btn-primary mt-2">
            Continuar compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart