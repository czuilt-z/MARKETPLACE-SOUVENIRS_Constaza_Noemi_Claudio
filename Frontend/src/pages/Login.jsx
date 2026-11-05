import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/*función para probar login sin conectar api*/
function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      alert('Por favor, completa todos los campos.')
      return
    }

    iniciarSesion(email)
    navigate('/')
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
                    placeholder="Ingresa tu contraseña"
                    style={{ borderColor: '#D9A6A0' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-arotopia w-100 mt-2"
                >
                  Iniciar sesión
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
