import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { usePublicacion } from '../hooks/usePublicaciones'
import EstadoCarga from '../components/EstadoCarga'
import { formatearPrecio, mensajeError } from '../api/utils'

function ProductDetail() {

  const { agregarAlCarrito } = useCart()
  const { usuario, puedeComprar, esAdmin } = useAuth()
  const [cantidad, setCantidad] = useState(1)
  const [aviso, setAviso] = useState(null)
  const [agregando, setAgregando] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { publicacion: producto, cargando, error } = usePublicacion(id)

  const esPropia = Boolean(usuario) && producto?.idUsuario === usuario.id_usuario

  const handleAgregar = async () => {
    if (!usuario) {
      navigate('/login', { state: { desde: location.pathname } })
      return
    }

    try {
      setAgregando(true)
      await agregarAlCarrito(producto.id, cantidad)
      setAviso({ tipo: 'success', texto: 'Producto agregado al carrito.' })
    } catch (err) {
      setAviso({ tipo: 'danger', texto: mensajeError(err, 'No se pudo agregar al carrito.') })
    } finally {
      setAgregando(false)
    }
  }

  if (!cargando && !producto) {
  return (
    <div className="container py-5 text-center">
      <h2>Producto no encontrado</h2>
      <p>Lo sentimos, el producto que buscas no está disponible :C.</p>
      <Link to="/productos" className="btn btn-arotopia">Ver productos</Link>
    </div>
  )
  }

return (
  <main className="container py-5">
    <EstadoCarga cargando={cargando} error={producto ? '' : error}>
    {producto && (
    <div className="row g-5 align-items-center">

      <div className="col-md-6">
        <img
          src={producto.imagen}
          alt={producto.titulo}
          className="img-fluid rounded shadow-sm w-100"
          style={{
            aspectRatio: '3 / 4',
            maxHeight: '600px',
            objectFit: 'contain',
            backgroundColor: '#F4E8DF',
          }}
        />
      </div>

      <div className="col-md-6">

        <h2
          className="fw-bold"
          style={{ color: '#67434A' }}
        >
          {producto.titulo}
        </h2>

        <p className="text-muted">
          {producto.descripcion}
        </p>

        <h3
          className="fw-bold my-4"
          style={{ color: '#67434A' }}
        >
          {formatearPrecio(producto.precio)}
        </h3>

        <p className="text-muted small">
          {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock por ahora'}
        </p>

        {/* El administrador y el dueño de la publicación pueden editarla */}
        {(esAdmin || producto.idUsuario === usuario?.id_usuario) && (
          <Link to={`/editar-publicacion/${producto.id}`} className="btn btn-outline-secondary mb-4">
            ✏️ Editar publicación
          </Link>
        )}

        {aviso && (
          <div className={`alert alert-${aviso.tipo} py-2`} role="alert">
            {aviso.texto}{' '}
            {aviso.tipo === 'success' && <Link to="/carrito">Ver carrito</Link>}
          </div>
        )}

        {(!usuario || (puedeComprar && !esPropia)) ? (
          <>
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Cantidad
              </label>

              <input
                type="number"
                className="form-control"
                min="1"
                max={producto.stock || 1}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                style={{ maxWidth: '120px' }}
              />
            </div>

            <button
              className="btn btn-arotopia"
              onClick={handleAgregar}
              disabled={agregando || producto.stock < 1}
            >
              {usuario ? 'Agregar al carrito' : 'Inicia sesión para comprar'}
            </button>
          </>
        ) : (
          <p className="text-muted fst-italic">
            Esta es tu publicación.
          </p>
        )}

      </div>
    </div>
    )}
    </EstadoCarga>
  </main>
  )
}

export default ProductDetail
