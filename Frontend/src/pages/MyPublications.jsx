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
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Mis publicaciones</h2>

        <Link to="/crear-publicacion" className="btn btn-primary">
          Crear publicación
        </Link>
      </div>

      <div className="row g-4">
        {publicaciones.map((producto) => (
          <div className="col-md-6 col-lg-4" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
              />

              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text text-muted">
                  {producto.descripcion}
                </p>
                <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>

                <Link
                  to={`/editar-publicacion/${producto.id}`}
                  className="btn btn-outline-primary w-100"
                >
                  Editar publicación
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPublications