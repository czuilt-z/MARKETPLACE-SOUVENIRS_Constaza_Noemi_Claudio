import { Link } from 'react-router-dom'

function Register() {
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
              ¡Únete a Arotopía!
            </h1>

            <p className="text-muted">
              Crea tu cuenta y descubre productos únicos
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

              <form>
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
                    placeholder="Crea una contraseña"
                    style={{ borderColor: '#D9A6A0' }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold"
                    style={{ color: '#67434A' }}
                  >
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Repite tu contraseña"
                    style={{ borderColor: '#D9A6A0' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-arotopia w-100 mt-2"
                >
                  Crear cuenta
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
