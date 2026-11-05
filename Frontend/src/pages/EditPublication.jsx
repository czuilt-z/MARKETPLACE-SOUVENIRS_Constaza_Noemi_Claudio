import { Link, useParams, useNavigate } from 'react-router-dom'

function EditPublication() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
                Editar publicación
              </h2>

              <p className="text-muted mb-4">
                Actualiza la información de tu producto y mantén tu publicación al día.
              </p>

              <form>
                {/* Imagen y datos principales */}
                <div className="row g-4 mb-4">
                  <div className="col-md-5">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center mb-3"
                      style={{
                        minHeight: '230px',
                        backgroundColor: '#F4E8DF',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src="https://placehold.co/400x400"
                        alt="Imagen del producto"
                        className="img-fluid"
                        style={{
                          width: '100%',
                          height: '230px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                      URL de la imagen
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      defaultValue="https://placehold.co/300x200"
                      style={{ borderColor: '#D9A6A0' }}
                    />
                  </div>

                  <div className="col-md-7">
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                        Nombre del producto
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Artesanía decorativa"
                        style={{ borderColor: '#D9A6A0' }}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                        Stock disponible
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue="10"
                        style={{ borderColor: '#D9A6A0' }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                        Precio
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        defaultValue="15000"
                        style={{ borderColor: '#D9A6A0' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                    Descripción del producto
                  </label>
                  <textarea
                    className="form-control"
                    rows="5"
                    defaultValue="Producto artesanal hecho a mano."
                    style={{ borderColor: '#D9A6A0' }}
                  />
                </div>

                {/* Categoría */}
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#67434A' }}>
                    Categoría
                  </label>
                  <select
                    className="form-select"
                    defaultValue="artesania"
                    style={{ borderColor: '#D9A6A0' }}
                  >
                    <option value="artesania">Artesanía</option>
                    <option value="decoracion">Decoración</option>
                    <option value="souvenirs">Souvenirs</option>
                  </select>
                </div>

                <p className="text-muted small">
                  Identificador de publicación: {id}
                </p>

                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    type="button"
                    className="btn btn-arotopia flex-grow-1"
                    onClick={() => navigate('/mis-publicaciones')}
                  >
                    Guardar cambios
                  </button>

                  <Link to="/mis-publicaciones" className="btn btn-arotopia">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
    </main>
  )
}

export default EditPublication