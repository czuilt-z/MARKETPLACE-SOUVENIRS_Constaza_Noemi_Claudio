function CreatePublication() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-primary fw-bold mb-4">
                Crear publicación
              </h2>

              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa el nombre del producto"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe las características del producto"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      placeholder="Ej. 15000"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock disponible</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      placeholder="Cantidad"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="artesania">Artesanía</option>
                    <option value="decoracion">Decoración</option>
                    <option value="souvenirs">Souvenirs</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">URL de la imagen</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Publicar producto
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePublication