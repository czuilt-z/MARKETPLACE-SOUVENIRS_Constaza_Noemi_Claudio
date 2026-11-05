import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { usuario, cerrarSesion } = useAuth()
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-arotopia">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Arotopía
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>

            {usuario ? (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">
                Mi cuenta
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => {
                  cerrarSesion()
                  window.location.href = '/'
                }}
                style={{ textDecoration: 'none' }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Iniciar sesión
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/registro">
                Registrarse
              </Link>
            </li>
          </>
        )}

            <li className="nav-item ms-lg-3">
              <Link
                className="nav-link"
                to="/carrito"
                style={{ fontSize: '1.4rem' }}
                aria-label="Ir al carrito"
                title="Mi carrito"
              >
                🛒
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
