
function Footer() {
  return (
    <footer className="footer-arotopia mt-5 py-4">
      <div className="container">
        <div className="row g-4">

          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Arotopía</h5>
            <p>
              Un espacio para descubrir productos únicos,
              artesanales y que demuestren tu estilo.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="/productos" className="text-white text-decoration-none">Productos</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Contacto</h5>
            <p className="mb-1">Correo: contacto@arotopia.cl</p>
            <p>Gracias por visitar nuestra tienda.</p>
          </div>

        </div>

        <hr className="border-light" />

        <p className="text-center mb-0">
          © 2026 Arotopía. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
