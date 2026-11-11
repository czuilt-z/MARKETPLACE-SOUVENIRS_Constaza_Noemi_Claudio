import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import EstadoCarga from '../components/EstadoCarga'
import { usePublicaciones, useCategorias } from '../hooks/usePublicaciones'

const estiloFiltro = {
  borderColor: '#A65F67',
  color: '#67434A',
}

function Products() {

  const [ordenPrecio, setOrdenPrecio] = useState('mayor')
  const [idCategoria, setIdCategoria] = useState('')
  const [texto, setTexto] = useState('')
  const [busqueda, setBusqueda] = useState('')

  
  useEffect(() => {
    const espera = setTimeout(() => setBusqueda(texto.trim()), 400)
    return () => clearTimeout(espera)
  }, [texto])

  const categorias = useCategorias()
  const { publicaciones, cargando, error } = usePublicaciones({
    id_categoria: idCategoria,
    busqueda,
  })

  const productosOrdenados = [...publicaciones].sort((a, b) => {
    if (ordenPrecio === 'mayor') {
      return b.precio - a.precio
    }
      return a.precio - b.precio
})

  return (
    <main className="container py-5">

      <div className="row g-3 align-items-end mb-4">
        <div className="col-12 col-md-5">
          <label htmlFor="busqueda" className="fw-semibold mb-1" style={{ color: '#67434A' }}>
            Buscar
          </label>
          <input
            id="busqueda"
            type="search"
            className="form-control"
            placeholder="Ej. aros, amigurumi..."
            style={estiloFiltro}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>

        <div className="col-6 col-md-3 ms-md-auto">
          <label htmlFor="categoria" className="fw-semibold mb-1" style={{ color: '#67434A' }}>
            Categoría
          </label>
          <select
            id="categoria"
            className="form-select"
            style={estiloFiltro}
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.id_categoria} value={c.id_categoria}>
                {c.categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-3">
          <label
            htmlFor="ordenPrecio"
            className="fw-semibold mb-1"
            style={{ color: '#67434A' }}
          >
            Ordenar por
          </label>

          <select
            id="ordenPrecio"
            className="form-select"
            style={estiloFiltro}
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="mayor">Precio: mayor a menor</option>
            <option value="menor">Precio: menor a mayor</option>
          </select>
        </div>
      </div>

      <EstadoCarga cargando={cargando} error={error}>
        {productosOrdenados.length === 0 ? (
          <p className="text-center text-muted py-5">
            No encontramos productos con esos filtros.
          </p>
        ) : (
          <div className="row g-4">
            {productosOrdenados.map((producto) => (
              <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}
      </EstadoCarga>

    </main>
  )
}

export default Products
