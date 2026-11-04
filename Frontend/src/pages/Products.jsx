import ProductCard from '../components/ProductCard'

function Products() {

  const productos = [
    {
      id: 1,
      titulo: 'Souvenir artesanal',
      descripcion: 'Producto elaborado por artesanos locales.',
      precio: 5990,
      imagen: 'https://placehold.co/600x400?text=Souvenir'
    },
    {
      id: 2,
      titulo: 'Recuerdo de Chile',
      descripcion: 'Un recuerdo especial de nuestra cultura.',
      precio: 7990,
      imagen: 'https://placehold.co/600x400?text=Chile'
    },
    {
      id: 3,
      titulo: 'Artesanía decorativa',
      descripcion: 'Decoración inspirada en nuestras tradiciones.',
      precio: 9990,
      imagen: 'https://placehold.co/600x400?text=Artesania'
    }
  ]

  return (
    <main className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold text-primary">
          Nuestros productos
        </h1>

        <p className="text-muted">
          Explora los productos disponibles en Arotopía.
        </p>
      </div>

      <div className="row g-4">

        {productos.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <ProductCard producto={producto} />
          </div>
        ))}

      </div>

    </main>
  )
}

export default Products