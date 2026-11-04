import { Link, useParams } from 'react-router-dom'

function EditPublication() {
  const { id } = useParams()

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-primary fw-bold mb-4">
                Editar publicación
              </h2>

              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre del producto</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Artesanía decorativa"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    defaultValue="Producto artesanal hecho a mano."
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="15000"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock disponible</label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="10"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select className="form-select" defaultValue="artesania">
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
                    defaultValue="https://placehold.co/300x200"
                  />
                </div>

                <p className="text-muted small">Identificador de publicación: {id}</p>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-grow-1">
                    Guardar cambios
                  </button>

                  <Link to="/mis-publicaciones" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPublication