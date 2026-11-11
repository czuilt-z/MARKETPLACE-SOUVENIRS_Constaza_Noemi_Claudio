import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { usePublicaciones } from '../hooks/usePublicaciones'
import EstadoCarga from '../components/EstadoCarga'
import { formatearPrecio, mensajeError } from '../api/utils'

function MyPublications() {
  const { usuario, esAdmin } = useAuth()
    const { publicaciones, cargando, error, recargar } = usePublicaciones(
    esAdmin ? {} : { id_usuario: usuario.id_usuario }
  )
  const [errorAccion, setErrorAccion] = useState('')

  // stock en 0 con PUT /publicaciones/:id
  const marcarAgotado = async (producto) => {
    try {
      setErrorAccion('')
      await api.put(`/publicaciones/${producto.id}`, {
        titulo_publicacion: producto.titulo,
        descripcion_publicacion: producto.descripcion,
        valor_publicacion: producto.precio,
        stock_publicacion: 0,
        id_categoria: producto.idCategoria,
      })
      await recargar()
    } catch (err) {
      setErrorAccion(mensajeError(err))
    }
  }

  // DELETE /publicaciones/:id
  const eliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar "${producto.titulo}"?`)) return
    try {
      setErrorAccion('')
      await api.delete(`/publicaciones/${producto.id}`)
      await recargar()
    } catch (err) {
      setErrorAccion(mensajeError(err))
    }
  }

  return (
    <main className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
            {esAdmin ? 'Todas las publicaciones' : 'Mis publicaciones'}
          </h2>
          <p className="text-muted mb-0">
            {esAdmin
              ? 'Como administrador puedes editar o eliminar las publicaciones de todos los usuarios.'
              : 'Administra los productos que compartes en Arotopía.'}
          </p>
        </div>

        <Link to="/crear-publicacion" className="btn btn-arotopia">
          + Crear publicación
        </Link>
      </div>

      {errorAccion && <div className="alert alert-danger py-2">{errorAccion}</div>}

      <EstadoCarga cargando={cargando} error={error}>
        {publicaciones.length === 0 && (
          <p className="text-center text-muted py-5">
            Aún no tienes publicaciones. ¡Crea la primera!
          </p>
        )}

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
                    alt={producto.titulo}
                    className="img-fluid w-100"
                    style={{
                      height: '220px',
                      objectFit: 'contain',
                      backgroundColor: '#F4E8DF',
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body p-4">
                    <h5 className="fw-bold" style={{ color: '#3D292B' }}>
                      {producto.titulo}
                    </h5>

                    <p className="text-muted mb-2">
                      {producto.descripcion}
                    </p>

                    <p className="fw-bold mb-1" style={{ color: '#3D292B' }}>
                      {formatearPrecio(producto.precio)}
                    </p>
                    <p className={`small mb-3 ${producto.stock > 0 ? 'text-muted' : 'text-danger fw-semibold'}`}>
                      {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                      <Link
                        to={`/editar-publicacion/${producto.id}`}
                        className="btn btn-arotopia"
                      >
                        Editar publicación
                      </Link>

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => marcarAgotado(producto)}
                        disabled={producto.stock === 0}
                      >
                        Marcar como agotado
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => eliminar(producto)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </EstadoCarga>
    </main>
  )
}

export default MyPublications
