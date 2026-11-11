import { startTransition } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { NOMBRE_ROL } from '../api/utils'

function Profile() {
  const { usuario, cerrarSesion, esAdmin, puedePublicar, puedeComprar } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    startTransition(() => {
      navigate('/')
      cerrarSesion()
    })
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
                {(usuario?.nombre_usuario || usuario?.email)?.charAt(0).toUpperCase() || 'U'}
              </div>

              <h2 className="fw-bold" style={{ color: '#67434A' }}>
                Mi perfil
              </h2>

              <p className="text-muted">
                Hola {usuario?.nombre_usuario}, bienvenido/a a tu cuenta de Arotopía.
              </p>

              <span className="badge rounded-pill" style={{ backgroundColor: '#A65F67' }}>
                {NOMBRE_ROL[usuario?.id_rol]}
              </span>

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

                {puedePublicar && (
                  <Link
                    to="/mis-publicaciones"
                    className="btn btn-arotopia"
                  >
                    {esAdmin ? 'Administrar publicaciones' : 'Mis publicaciones'}
                  </Link>
                )}

                {esAdmin && (
                  <Link
                    to="/admin/usuarios"
                    className="btn btn-arotopia"
                  >
                    Administrar usuarios
                  </Link>
                )}

                {puedeComprar && (
                  <Link
                    to="/carrito"
                    className="btn btn-arotopia"
                  >
                    Mi carrito
                  </Link>
                )}

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
