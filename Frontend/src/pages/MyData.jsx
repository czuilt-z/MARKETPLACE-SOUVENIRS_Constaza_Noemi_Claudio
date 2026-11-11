import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useUbicacion } from '../hooks/useUbicacion'
import EstadoCarga from '../components/EstadoCarga'
import { mensajeError } from '../api/utils'

function MyData() {
  const { usuario, actualizarUsuario } = useAuth()
  const { regiones, comunasDeRegion, regionDeComuna } = useUbicacion()

  const [datos, setDatos] = useState(null)
  const [idRegion, setIdRegion] = useState('')
  const [cargando, setCargando] = useState(true)
  const [aviso, setAviso] = useState(null)
  const [guardando, setGuardando] = useState(false)

  // GET /usuarios/:id_usuario
  useEffect(() => {
    const cargar = async () => {
      try {
        const { data } = await api.get(`/usuarios/${usuario.id_usuario}`)
        setDatos({
          nombre_usuario: data.nombre_usuario || '',
          apellido_usuario: data.apellido_usuario || '',
          email_usuario: data.email_usuario || '',
          telefono_usuario: data.telefono_usuario || '',
          direccion_usuario: data.direccion_usuario || '',
          id_comuna: data.id_comuna || '',
        })
      } catch (err) {
        setAviso({ tipo: 'danger', texto: mensajeError(err, 'No se pudieron cargar tus datos.') })
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [usuario.id_usuario])

   const regionMostrada = idRegion || regionDeComuna(datos?.id_comuna)

  const handleChange = (e) => {
    const { name, value } = e.target

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }))
  }

  const handleRegion = (e) => {
    setIdRegion(e.target.value)
    setDatos((actual) => ({ ...actual, id_comuna: '' }))
  }

  // PUT /usuarios/:id_usuario
  const handleSubmit = async (e) => {
    e.preventDefault()

    const obligatorios = ['nombre_usuario', 'apellido_usuario', 'email_usuario', 'direccion_usuario']
    if (obligatorios.some((campo) => !String(datos[campo]).trim())) {
      setAviso({ tipo: 'danger', texto: 'Nombre, apellido, correo y dirección son obligatorios.' })
      return
    }

    try {
      setGuardando(true)
      await api.put(`/usuarios/${usuario.id_usuario}`, {
        ...datos,
        id_comuna: datos.id_comuna ? Number(datos.id_comuna) : null,
      })
      actualizarUsuario({ nombre_usuario: datos.nombre_usuario, email: datos.email_usuario })
      setAviso({ tipo: 'success', texto: 'Tus datos se han guardado correctamente.' })
    } catch (err) {
      setAviso({ tipo: 'danger', texto: mensajeError(err, 'No se pudieron guardar los cambios.') })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4" style={{ color: '#67434A' }}>
                Mis datos
              </h2>

              {aviso && (
                <div className={`alert alert-${aviso.tipo} py-2`} role="alert">
                  {aviso.texto}
                </div>
              )}

              <EstadoCarga cargando={cargando}>
                {datos && (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label" htmlFor="nombre">Nombre</label>
                      <input id="nombre" type="text" className="form-control" name="nombre_usuario" autoComplete="given-name"
                        value={datos.nombre_usuario} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label" htmlFor="apellido">Apellido</label>
                      <input id="apellido" type="text" className="form-control" name="apellido_usuario" autoComplete="family-name"
                        value={datos.apellido_usuario} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" className="form-control" name="email_usuario" autoComplete="email"
                      value={datos.email_usuario} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="telefono">Teléfono</label>
                    <input id="telefono" type="tel" className="form-control" name="telefono_usuario" autoComplete="tel"
                      value={datos.telefono_usuario} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="direccion">Dirección de despacho (calle y número)</label>
                    <input id="direccion" type="text" className="form-control" name="direccion_usuario" autoComplete="street-address"
                      value={datos.direccion_usuario} onChange={handleChange} />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label" htmlFor="region">Región</label>
                      <select id="region" className="form-select" value={regionMostrada} onChange={handleRegion}>
                        <option value="">Selecciona una región</option>
                        {regiones.map((r) => (
                          <option key={r.id_region} value={r.id_region}>{r.nombre_region}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label" htmlFor="comuna">Comuna</label>
                      <select id="comuna" className="form-select" name="id_comuna"
                        value={datos.id_comuna} onChange={handleChange} disabled={!regionMostrada}>
                        <option value="">Selecciona una comuna</option>
                        {comunasDeRegion(regionMostrada).map((c) => (
                          <option key={c.id_comuna} value={c.id_comuna}>{c.nombre_comuna}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-arotopia w-100 mt-3" disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </form>
                )}
              </EstadoCarga>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MyData
