
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="card border-0 shadow-sm p-4 p-md-5"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <h1
              className="fw-bold mb-3"
              style={{ color: '#67434A', fontSize: '5rem' }}
            >
              404
            </h1>

            <h2 className="fw-bold mb-3" style={{ color: '#67434A' }}>
              ¡Ups! No encontramos esta página
            </h2>

            <p className="text-muted mb-4">
              Parece que la página que buscas no existe o fue movida.
              Pero no te preocupes, puedes volver a explorar Arotopía.
            </p>

            <Link to="/" className="btn btn-arotopia">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound
