import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategorias } from '../hooks/usePublicaciones'
import { urlImagen } from '../api/utils'

const estiloLabel = { color: '#67434A' }
const estiloInput = { borderColor: '#D9A6A0' }

const TAMANO_MAXIMO_MB = 5
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function PublicationForm({ inicial, textoBoton, onGuardar, volverA = '/mis-publicaciones' }) {
  const categorias = useCategorias()
  const [formulario, setFormulario] = useState({
    titulo: inicial?.titulo || '',
    descripcion: inicial?.descripcion || '',
    precio: inicial?.precio ?? '',
    stock: inicial?.stock ?? 1,
    idCategoria: inicial?.idCategoria || '',
  })
  const [archivo, setArchivo] = useState(null)
  const [vistaPrevia, setVistaPrevia] = useState(
    inicial?.imagenes?.[0] ? urlImagen(inicial.imagenes[0].url_img) : ''
  )
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    return () => {
      if (vistaPrevia.startsWith('blob:')) URL.revokeObjectURL(vistaPrevia)
    }
  }, [vistaPrevia])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  const handleArchivo = (e) => {
    const elegido = e.target.files[0]
    if (!elegido) return

    if (!TIPOS_PERMITIDOS.includes(elegido.type)) {
      setError('La imagen debe ser JPG, PNG, WEBP o GIF.')
      e.target.value = ''
      return
    }
    if (elegido.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
      setError(`La imagen no puede pesar más de ${TAMANO_MAXIMO_MB} MB.`)
      e.target.value = ''
      return
    }

    setError('')
    setArchivo(elegido)
    setVistaPrevia(URL.createObjectURL(elegido))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formulario.titulo.trim() || formulario.precio === '' || !formulario.idCategoria) {
      setError('El nombre, el precio y la categoría son obligatorios.')
      return
    }
    if (Number(formulario.precio) < 0 || Number(formulario.stock) < 0) {
      setError('El precio y el stock no pueden ser negativos.')
      return
    }

    try {
      setEnviando(true)
      setError('')
      await onGuardar({ ...formulario, archivo })
    } catch (err) {
      setError(err.message)
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-5">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center mb-3"
            style={{ aspectRatio: '3 / 4', backgroundColor: '#F4E8DF', overflow: 'hidden' }}
          >
            {vistaPrevia ? (
              <img
                src={vistaPrevia}
                alt="Vista previa del producto"
                className="w-100 h-100"
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span className="text-muted small">Sin imagen</span>
            )}
          </div>

          <label htmlFor="imagen" className="form-label fw-semibold" style={estiloLabel}>
            {vistaPrevia ? 'Cambiar imagen' : 'Imagen del producto'}
          </label>
          <input
            id="imagen"
            type="file"
            accept={TIPOS_PERMITIDOS.join(',')}
            className="form-control"
            onChange={handleArchivo}
            style={estiloInput}
          />
          <div className="form-text">JPG, PNG, WEBP o GIF, hasta {TAMANO_MAXIMO_MB} MB.</div>
        </div>

        <div className="col-md-7">
          <div className="mb-4">
            <label htmlFor="titulo" className="form-label fw-semibold" style={estiloLabel}>
              Nombre del producto *
            </label>
            <input id="titulo" type="text" name="titulo" className="form-control"
              value={formulario.titulo} onChange={handleChange} style={estiloInput} />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <label htmlFor="precio" className="form-label fw-semibold" style={estiloLabel}>
                Precio *
              </label>
              <input id="precio" type="number" min="0" name="precio" className="form-control"
                value={formulario.precio} onChange={handleChange} style={estiloInput} />
            </div>
            <div className="col-6">
              <label htmlFor="stock" className="form-label fw-semibold" style={estiloLabel}>
                Stock
              </label>
              <input id="stock" type="number" min="0" name="stock" className="form-control"
                value={formulario.stock} onChange={handleChange} style={estiloInput} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="categoria" className="form-label fw-semibold" style={estiloLabel}>
              Categoría *
            </label>
            <select id="categoria" name="idCategoria" className="form-select"
              value={formulario.idCategoria} onChange={handleChange} style={estiloInput}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.id_categoria} value={c.id_categoria}>{c.categoria}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label fw-semibold" style={estiloLabel}>
              Descripción del producto
            </label>
            <textarea id="descripcion" name="descripcion" className="form-control" rows="5"
              value={formulario.descripcion} onChange={handleChange} style={estiloInput} />
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <button type="submit" className="btn btn-arotopia flex-grow-1" disabled={enviando}>
          {enviando ? 'Guardando...' : textoBoton}
        </button>
        <Link to={volverA} className="btn btn-outline-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  )
}

export default PublicationForm
