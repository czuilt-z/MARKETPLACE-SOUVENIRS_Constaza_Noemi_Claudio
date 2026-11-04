function ProductDetail() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://placehold.co/600x450"
            alt="Imagen del producto"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2 className="text-primary fw-bold">Nombre del producto</h2>
          <p className="text-muted">Categoría del producto</p>

          <h3 className="my-4">$15.000</h3>

          <p>
            Aquí se mostrará una descripción detallada del producto,
            sus características y otros antecedentes relevantes.
          </p>

          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              min="1"
              defaultValue="1"
            />
          </div>

          <button className="btn btn-primary">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail