import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import EstadoCarga from '../components/EstadoCarga'
import { usePublicaciones } from '../hooks/usePublicaciones'

function Home() {
  const imagenes = [
  '/imagenes/Oni.jpeg',
  '/imagenes/Espeon.jpeg',
  '/imagenes/Monstera.jpeg',
]

  const [imagenActual, setImagenActual] = useState(0)

  const { publicaciones, cargando, error } = usePublicaciones()
  const novedades = publicaciones.slice(0, 4)

  const anterior = () => {
    setImagenActual((actual) =>
      actual === 0 ? imagenes.length - 1 : actual - 1
    )
  }

  const siguiente = () => {
    setImagenActual((actual) =>
      actual === imagenes.length - 1 ? 0 : actual + 1
    )
  }

  return (
    <main>
      <section className="container-fluid px-0 mt-4">
        <div
          className="position-relative"
          style={{ height: 'clamp(320px, 60vh, 520px)', overflow: 'hidden', backgroundColor: '#F4E8DF' }}
        >
          {/* Fondo: la misma imagen desenfocada para rellenar los costados */}
          <img
            src={imagenes[imagenActual]}
            alt=""
            aria-hidden="true"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover', filter: 'blur(24px) brightness(0.85)', transform: 'scale(1.1)' }}
          />
          {/* Imagen completa, sin recortar */}
          <img
          src={imagenes[imagenActual]}
          alt="Productos y novedades de Arotopía"
          className="position-relative w-100 h-100"
          style={{ objectFit: 'contain' }}
          />

        <button
            className="btn position-absolute top-50 start-0 translate-middle-y ms-3"
            style={{
            backgroundColor: '#F4E8DF',
            color: '#67434A',
            border: '1px solid #A65F67',
            fontSize: '1.5rem',
            }}
          onClick={anterior}
       >
          ‹
      </button>

      <button
            className="btn position-absolute top-50 end-0 translate-middle-y me-3"
            style={{
              backgroundColor: '#F4E8DF',
              color: '#67434A',
              border: '1px solid #A65F67',
              fontSize: '1.5rem',
            }}
            onClick={siguiente}
      >
        ›
      </button>
      </div>
      </section>
        <section className="container my-5">
                <h2
                  className="text-center fw-bold mb-4"
                  style={{ color: '#67434A' }}
                >
                  Novedades
                </h2>

            <EstadoCarga cargando={cargando} error={error}>
              <div className="row g-4">
                {novedades.map((producto) => (
                  <div className="col-12 col-sm-6 col-lg-3" key={producto.id}>
                    <ProductCard producto={producto} />
                  </div>
                ))}
              </div>
            </EstadoCarga>
        </section> 
    
        <section className="container my-5 py-4">
            <div className="row align-items-center g-4">
                <div className="col-12 col-md-6">
                    <img
                      src="/imagenes/familia.jpeg"
                      alt="Familia Arotopía"
                      className="img-fluid rounded shadow-sm"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <h2
                      className="text-center fw-bold mb-4"
                      style={{ color: '#67434A' }}
                    >
                      Sobre nosotros
                    </h2>

                    <p style={{ textAlign: 'justify' }}>
                    En Arotopía Marketplace creamos productos capaces de conectar con las personas. 
                    Nuestros accesorios y confecciones buscan ser piezas únicas y entregar toda la 
                    personalidad que te caracteriza tanto a los outfits que luzcas como a tus espacios.
                    Nuestro objetivo es ofrecer una plataforma donde los creadores puedan compartir sus 
                    productos y los clientes encuentren recuerdos especiales.
                    </p>
                </div>
            </div>
      </section>
    </main>
  )
}

export default Home
