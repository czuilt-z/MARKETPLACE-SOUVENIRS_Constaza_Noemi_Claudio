function Profile() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '100px', height: '100px', fontSize: '40px' }}
                >
                  U
                </div>
              </div>

              <h2 className="text-primary fw-bold">Mi perfil</h2>
              <p className="text-muted">Bienvenido/a a tu cuenta de Arotopía.</p>

              <div className="d-grid gap-3 mt-4">
                <button className="btn btn-outline-primary">
                  Mis datos
                </button>

                <button className="btn btn-outline-primary">
                  Mis publicaciones
                </button>

                <button className="btn btn-outline-primary">
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile