import { useState } from 'react'
import ProductCard from '../components/ProductCard'

function Home() {
  const imagenes = [
    'https://placehold.co/1400x450?text=Bienvenidos+a+Arotopia',
    'https://placehold.co/1400x450?text=Productos+artesanales',
    'https://placehold.co/1400x450?text=Souvenirs+unicos',
  ]

  const [imagenActual, setImagenActual] = useState(0)
  
    const productos = [
    {
      id: 1,
      titulo: 'Souvenir porcelana en frío',
      descripcion: 'Producto elaborado por artesanos locales.',
      precio: 5990,
      imagen: 'https://placehold.co/400x300?text=Souvenir+artesanal',
    },
    {
      id: 2,
      titulo: 'Miniatura de impresión 3D',
      descripcion: 'Un detalle especial para regalar.',
      precio: 7990,
      imagen: 'https://placehold.co/400x300?text=Recuerdo+decorativo',
    },
    {
      id: 3,
      titulo: 'Aros Hunter',
      descripcion: 'Una pieza inspirada en nuestra cultura.',
      precio: 8990,
      imagen: 'https://placehold.co/400x300?text=Artesania+tradicional',
    },
    {
      id: 4,
      titulo: 'Souvenir especial',
      descripcion: 'Un recuerdo único para cualquier ocasión.',
      precio: 6990,
      imagen: 'https://placehold.co/400x300?text=Souvenir+especial',
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
        <div className="position-relative">
          <img
            src={imagenes[imagenActual]}
            alt="Productos y novedades de Arotopía"
            className="w-100"
            style={{ height: '300px', objectFit: 'cover' }}
          />

          <button
            className="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-3"
            onClick={anterior}
          >
            ‹
          </button>

          <button
            className="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-3"
            onClick={siguiente}
          >
            ›
          </button>
        </div>
      </section>
        <section className="container my-5">
                <h2 className="text-center fw-bold mb-4">
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
                    src="https://placehold.co/600x400?text=Sobre+Nosotros"
                    alt="Sobre Arotopía"
                    className="img-fluid rounded shadow-sm"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <h2 className="fw-bold mb-3">Sobre nosotros</h2>

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
