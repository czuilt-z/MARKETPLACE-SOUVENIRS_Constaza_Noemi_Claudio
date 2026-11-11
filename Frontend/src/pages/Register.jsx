import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUbicacion } from '../hooks/useUbicacion'
import { mensajeError } from '../api/utils'

const estiloLabel = { color: '#67434A' }
const estiloInput = { borderColor: '#D9A6A0' }

function Register() {
  const [datos, setDatos] = useState({
    nombre_usuario: '',
    apellido_usuario: '',
    email_usuario: '',
    telefono_usuario: '',
    direccion_usuario: '',
    id_region: '',
    id_comuna: '',
    contrasena_usuario: '',
    confirmar: '',
  })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const { registrar } = useAuth()
  const { regiones, comunasDeRegion } = useUbicacion()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos((actual) => ({
      ...actual,
      [name]: value,
      ...(name === 'id_region' ? { id_comuna: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const obligatorios = ['nombre_usuario', 'apellido_usuario', 'email_usuario', 'direccion_usuario', 'contrasena_usuario', 'confirmar']
    if (obligatorios.some((campo) => !datos[campo].trim())) {
      setError('Por favor, completa todos los campos obligatorios.')
      return
    }

    if (datos.contrasena_usuario.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (datos.contrasena_usuario !== datos.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    try {
      setEnviando(true)
      setError('')
      await registrar({
        nombre_usuario: datos.nombre_usuario.trim(),
        apellido_usuario: datos.apellido_usuario.trim(),
        email_usuario: datos.email_usuario.trim(),
        telefono_usuario: datos.telefono_usuario.trim(),
        direccion_usuario: datos.direccion_usuario.trim(),
        id_comuna: datos.id_comuna ? Number(datos.id_comuna) : null,
        contrasena_usuario: datos.contrasena_usuario,
      })
      navigate('/perfil')
    } catch (err) {
      setError(mensajeError(err, 'No se pudo crear la cuenta.'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main
      className="container py-5"
      style={{ minHeight: '75vh' }}
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-10 col-lg-7">

          <div className="text-center mb-4">
            <h1
              className="fw-bold mb-2"
              style={{ color: '#67434A' }}
            >
              ¡Únete a Arotopía!
            </h1>

            <p className="text-muted">
              Crea tu cuenta para comprar y vender productos únicos
            </p>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4 p-md-5">

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}


                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="nombre" className="form-label fw-semibold" style={estiloLabel}>
                      Nombre *
                    </label>
                    <input id="nombre" name="nombre_usuario" autoComplete="given-name" className="form-control" style={estiloInput}
                      value={datos.nombre_usuario} onChange={handleChange} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="apellido" className="form-label fw-semibold" style={estiloLabel}>
                      Apellido *
                    </label>
                    <input id="apellido" name="apellido_usuario" autoComplete="family-name" className="form-control" style={estiloInput}
                      value={datos.apellido_usuario} onChange={handleChange} />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="email" className="form-label fw-semibold" style={estiloLabel}>
                      Correo electrónico *
                    </label>
                    <input id="email" type="email" name="email_usuario" autoComplete="email" className="form-control" style={estiloInput}
                      placeholder="correo@ejemplo.com" value={datos.email_usuario} onChange={handleChange} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="telefono" className="form-label fw-semibold" style={estiloLabel}>
                      Teléfono
                    </label>
                    <input id="telefono" type="tel" name="telefono_usuario" autoComplete="tel" className="form-control" style={estiloInput}
                      value={datos.telefono_usuario} onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label fw-semibold" style={estiloLabel}>
                    Dirección de despacho (calle y número) *
                  </label>
                  <input id="direccion" name="direccion_usuario" autoComplete="street-address" className="form-control" style={estiloInput}
                    placeholder="Ej. Av. Central 123, depto 4" value={datos.direccion_usuario} onChange={handleChange} />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="region" className="form-label fw-semibold" style={estiloLabel}>
                      Región
                    </label>
                    <select id="region" name="id_region" className="form-select" style={estiloInput}
                      value={datos.id_region} onChange={handleChange}>
                      <option value="">Selecciona una región</option>
                      {regiones.map((r) => (
                        <option key={r.id_region} value={r.id_region}>{r.nombre_region}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="comuna" className="form-label fw-semibold" style={estiloLabel}>
                      Comuna
                    </label>
                    <select id="comuna" name="id_comuna" className="form-select" style={estiloInput}
                      value={datos.id_comuna} onChange={handleChange} disabled={!datos.id_region}>
                      <option value="">Selecciona una comuna</option>
                      {comunasDeRegion(datos.id_region).map((c) => (
                        <option key={c.id_comuna} value={c.id_comuna}>{c.nombre_comuna}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <label htmlFor="password" className="form-label fw-semibold" style={estiloLabel}>
                      Contraseña *
                    </label>
                    <input id="password" type="password" name="contrasena_usuario" autoComplete="new-password" className="form-control" style={estiloInput}
                      placeholder="Mínimo 6 caracteres" value={datos.contrasena_usuario} onChange={handleChange} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold" style={estiloLabel}>
                      Confirmar contraseña *
                    </label>
                    <input id="confirmPassword" type="password" name="confirmar" autoComplete="new-password" className="form-control" style={estiloInput}
                      placeholder="Repite tu contraseña" value={datos.confirmar} onChange={handleChange} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-arotopia w-100 mt-2"
                  disabled={enviando}
                >
                  {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>

                <p className="text-center text-muted mt-4 mb-0">
                  ¿Ya tienes una cuenta?{' '}
                  <Link
                    to="/login"
                    className="text-decoration-none fw-semibold"
                    style={{ color: '#A65F67' }}
                  >
                    Inicia sesión
                  </Link>
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Register
