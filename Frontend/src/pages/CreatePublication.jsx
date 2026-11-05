import { useState } from 'react'

function CreatePublication() {
  const [imagen, setImagen] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState('')

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4" style={{ color: '#67434A' }}>
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
                  <label className="form-label fw-semibold">
                    Imagen del producto
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    style={{ borderColor: '#D9A6A0' }}
                    onChange={(e) => {
                      const archivo = e.target.files[0]

                      if (archivo) {
                        setImagen(archivo)
                        setVistaPrevia(URL.createObjectURL(archivo))
                      }
                    }}
                  />
                </div>

                {vistaPrevia && (
                  <div className="mb-4 text-center">
                    <p className="fw-semibold mb-2" style={{ color: '#67434A' }}>
                      Vista previa de la imagen
                    </p>

                    <img
                      src={vistaPrevia}
                      alt="Vista previa del producto"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: '250px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        border: '1px solid #D9A6A0',
                        padding: '8px',
                        backgroundColor: '#FFF9F5',
                      }}
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-arotopia w-100">
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