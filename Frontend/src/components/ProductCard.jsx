import { useNavigate } from 'react-router-dom'

function ProductCard({ producto }) {
  const navigate = useNavigate()
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.titulo}
        style={{ height: '200px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">
          {producto.titulo}
        </h5>

        <p className="card-text text-muted">
          {producto.descripcion}
        </p>

        <h5 className="card-title fw-bold mt-auto">
          ${producto.precio}
        </h5>

        <button
          className="btn btn-arotopia mt-3"
          onClick={() => navigate(`/productos/${producto.id}`)}
        >
          Ver producto
        </button>
      </div>
    </div>
  )
}

export default ProductCard