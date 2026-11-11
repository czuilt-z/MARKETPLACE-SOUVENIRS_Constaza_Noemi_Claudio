import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import EstadoCarga from '../components/EstadoCarga'
import { NOMBRE_ROL, mensajeError } from '../api/utils'

function AdminUsers() {
  const { usuario } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [aviso, setAviso] = useState(null)
  const [version, setVersion] = useState(0)

  // GET /usuarios 
  useEffect(() => {
    let activo = true
    api.get('/usuarios')
      .then(({ data }) => activo && setUsuarios(data))
      .catch((err) => activo && setAviso({ tipo: 'danger', texto: mensajeError(err) }))
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [version])

  const recargar = () => setVersion((v) => v + 1)

  // PATCH /usuarios/:id/rol
  const cambiarRol = async (u, idRol) => {
    try {
      await api.patch(`/usuarios/${u.id_usuario}/rol`, { id_rol: Number(idRol) })
      setAviso({ tipo: 'success', texto: `${u.nombre_usuario} ahora es ${NOMBRE_ROL[idRol]}.` })
      recargar()
    } catch (err) {
      setAviso({ tipo: 'danger', texto: mensajeError(err) })
    }
  }

  // DELETE /usuarios/:id
  const eliminar = async (u) => {
    if (!window.confirm(`¿Eliminar a ${u.nombre_usuario} ${u.apellido_usuario}? También se borran sus publicaciones y su carrito.`)) return
    try {
      await api.delete(`/usuarios/${u.id_usuario}`)
      setAviso({ tipo: 'success', texto: 'Usuario eliminado.' })
      recargar()
    } catch (err) {
      setAviso({ tipo: 'danger', texto: mensajeError(err) })
    }
  }

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
        Administrar usuarios
      </h2>
      <p className="text-muted mb-4">
        Cambia el rol de los usuarios o elimina cuentas.
      </p>

      {aviso && (
        <div className={`alert alert-${aviso.tipo} py-2`} role="alert">
          {aviso.texto}
        </div>
      )}

      <EstadoCarga cargando={cargando}>
        <div className="table-responsive shadow-sm" style={{ borderRadius: '16px' }}>
          <table className="table align-middle mb-0" style={{ backgroundColor: '#FFF9F5' }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th style={{ minWidth: '160px' }}>Rol</th>
                <th>Registro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => {
                const esYo = u.id_usuario === usuario.id_usuario
                return (
                  <tr key={u.id_usuario}>
                    <td>
                      {u.nombre_usuario} {u.apellido_usuario}
                      {esYo && <span className="badge bg-secondary ms-2">Tú</span>}
                    </td>
                    <td>{u.email_usuario}</td>
                    <td>{u.telefono_usuario || '—'}</td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={u.id_rol}
                        onChange={(e) => cambiarRol(u, e.target.value)}
                        disabled={esYo}
                        aria-label={`Rol de ${u.nombre_usuario}`}
                      >
                        {Object.entries(NOMBRE_ROL).map(([id, nombre]) => (
                          <option key={id} value={id}>{nombre}</option>
                        ))}
                      </select>
                    </td>
                    <td className="text-muted small">
                      {new Date(u.fecha_registro).toLocaleDateString('es-CL')}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => eliminar(u)}
                        disabled={esYo}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </EstadoCarga>
    </main>
  )
}

export default AdminUsers
