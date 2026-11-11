import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NOMBRE_ROL } from '../api/utils'

function RutaPrivada({ roles }) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  if (roles && !roles.includes(usuario.id_rol)) {
    return (
      <main className="container py-5 text-center">
        <h2 className="fw-bold mb-3" style={{ color: '#67434A' }}>
          Sin acceso
        </h2>
        <p className="text-muted">
          Esta sección es solo para: {roles.map((r) => NOMBRE_ROL[r]).join(' o ')}.
        </p>
      </main>
    )
  }

  return <Outlet />
}

export default RutaPrivada
