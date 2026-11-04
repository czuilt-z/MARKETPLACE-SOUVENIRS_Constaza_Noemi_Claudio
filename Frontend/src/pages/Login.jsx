function Login() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-5 col-lg-4">

          <h1 className="text-center mb-4 fw-bold">
            Iniciar sesión
          </h1>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Iniciar sesión
                </button>

                <div className="text-center mt-3">
                  <a href="#" className="text-decoration-none">
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