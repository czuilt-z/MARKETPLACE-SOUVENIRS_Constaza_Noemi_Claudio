import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import { mensajeError } from '../api/utils'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.desde || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.')
      return
    }

    try {
      setEnviando(true)
      setError('')
      await iniciarSesion(email.trim(), password)
      navigate(destino, { replace: true })
    } catch (err) {
      setError(mensajeError(err, 'No se pudo iniciar sesión.'))
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
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">

          <div className="text-center mb-4">
            <h1
              className="fw-bold mb-2"
              style={{ color: '#67434A' }}
            >
              ¡Te damos la bienvenida!
            </h1>

            <p className="text-muted">
              Ingresa a tu cuenta de Arotopía
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

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                    style={{ color: '#67434A' }}
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    autoComplete="email"
                    placeholder="Ingresa tu correo"
                    style={{ borderColor: '#D9A6A0' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                    style={{ color: '#67434A' }}
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    autoComplete="current-password"
                    placeholder="Ingresa tu contraseña"
                    style={{ borderColor: '#D9A6A0' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-arotopia w-100 mt-2"
                  disabled={enviando}
                >
                  {enviando ? 'Ingresando...' : 'Iniciar sesión'}
                </button>

                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{ color: '#A65F67' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Login
