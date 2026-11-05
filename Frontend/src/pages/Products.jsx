import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { productos } from '../data/productos'

function Products() {

  const [ordenPrecio, setOrdenPrecio] = useState('mayor')

  const productosOrdenados = [...productos].sort((a, b) => {
    if (ordenPrecio === 'mayor') {
      return b.precio - a.precio
    }
      return a.precio - b.precio
})

  return (
    <main className="container py-5">

      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <label
            htmlFor="ordenPrecio"
            className="fw-semibold"
            style={{ color: '#67434A' }}
          >
            Ordenar por:
          </label>

          <select
            id="ordenPrecio"
            className="form-select"
            style={{
              width: '220px',
              borderColor: '#A65F67',
              color: '#67434A',
            }}
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="mayor">Precio: mayor a menor</option>
            <option value="menor">Precio: menor a mayor</option>
          </select>
      </div>
    </div>

      <div className="row g-4">

        {productosOrdenados.map((producto) => (
          <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
            <ProductCard producto={producto} />
          </div>
        ))}

      </div>

    </main>
  )
}

export default Products