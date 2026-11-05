import { useState } from 'react'
import ProductCard from '../components/ProductCard'

function Home() {
  const imagenes = [
  '/imagenes/Oni.jpeg',
  '/imagenes/Espeon.jpeg',
  '/imagenes/Monstera.jpeg',
]

  const [imagenActual, setImagenActual] = useState(0)
  
    const productos = [
  {
    id: 1,
    titulo: 'Amigurumi Batman',
    descripcion: 'Producto elaborado por artesanos locales.',
    precio: 5990,
    imagen: '/imagenes/Batman.jpeg',
  },
  {
    id: 2,
    titulo: 'Aros Totoro',
    descripcion: 'Un detalle especial para regalar.',
    precio: 7990,
    imagen: '/imagenes/Totoro.jpeg',
  },
  {
    id: 3,
    titulo: 'Aros Venasur',
    descripcion: 'Una pieza inspirada en nuestra cultura.',
    precio: 8990,
    imagen: '/imagenes/venasur.jpeg',
  },
  {
    id: 4,
    titulo: 'Amigurumi Spiderman',
    descripcion: 'Un recuerdo único para cualquier ocasión.',
    precio: 6990,
    imagen: '/imagenes/Spiderman.jpeg',
  },
]

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
          style={{ height: '300px', overflow: 'hidden' }}
        >
          <img
          src={imagenes[imagenActual]}
          alt="Productos y novedades de Arotopía"
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
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

            <div className="row g-4">
                {productos.map((producto) => (
                 <div className="col-12 col-sm-6 col-lg-3" key={producto.id}>
                <ProductCard producto={producto} />
                </div>
                ))}
            </div>
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
