import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Profile() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/')
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body text-center p-4 p-md-5">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: '100px',
                  height: '100px',
                  fontSize: '40px',
                  backgroundColor: '#67434A',
                  color: '#FFF9F5',
                }}
              >
                {usuario?.email?.charAt(0).toUpperCase() || 'U'}
              </div>

              <h2 className="fw-bold" style={{ color: '#67434A' }}>
                Mi perfil
              </h2>

              <p className="text-muted">
                Bienvenido/a a tu cuenta de Arotopía.
              </p>

              <div
                className="rounded-3 p-3 my-4 text-start"
                style={{ backgroundColor: '#F4E8DF' }}
              >
                <p className="fw-semibold mb-1" style={{ color: '#67434A' }}>
                  Correo electrónico
                </p>

                <p className="mb-0 text-muted">
                  {usuario?.email || 'No hay una sesión activa'}
                </p>
              </div>

              <div className="d-grid gap-3 mt-4">

                <Link
                  to="/mis-datos"
                  className="btn btn-arotopia"
                >
                  Mis datos
                </Link>

                <Link
                  to="/mis-publicaciones"
                  className="btn btn-arotopia"
                >
                  Mis publicaciones
                </Link>

                <button
                  className="btn btn-arotopia"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Profile
