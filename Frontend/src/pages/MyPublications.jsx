import { Link } from 'react-router-dom'

function MyPublications() {
  const publicaciones = [
    {
      id: 1,
      nombre: 'Artesanía decorativa',
      descripcion: 'Producto artesanal hecho a mano.',
      precio: 15000,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 2,
      nombre: 'Souvenir tradicional',
      descripcion: 'Recuerdo representativo de la zona.',
      precio: 10000,
      imagen: 'https://placehold.co/300x200',
    },
  ]

  return (
    <main className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
            Mis publicaciones
          </h2>
          <p className="text-muted mb-0">
            Administra los productos que compartes en Arotopía.
          </p>
        </div>

        <Link to="/crear-publicacion" className="btn btn-arotopia">
          + Crear publicación
        </Link>
      </div>

      <div className="d-flex flex-column gap-3">
        {publicaciones.map((producto) => (
          <div
            key={producto.id}
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
              overflow: 'hidden',
            }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-3">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid w-100"
                  style={{
                    height: '190px',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="col-md-9">
                <div className="card-body p-4">
                  <h5 className="fw-bold" style={{ color: '#3D292B' }}>
                    {producto.nombre}
                  </h5>

                  <p className="text-muted mb-2">
                    {producto.descripcion}
                  </p>

                  <p className="fw-bold mb-3" style={{ color: '#3D292B' }}>
                    ${producto.precio.toLocaleString('es-CL')}
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <Link
                      to={`/editar-publicacion/${producto.id}`}
                      className="btn btn-arotopia"
                    >
                      Editar publicación
                    </Link>

                    <button type="button" className="btn btn-outline-secondary">
                      Marcar como agotado
                    </button>

                    <button type="button" className="btn btn-outline-danger">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MyPublications
