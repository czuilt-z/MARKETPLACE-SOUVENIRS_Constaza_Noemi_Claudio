import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import PublicationForm from '../components/PublicationForm'
import { mensajeError } from '../api/utils'

function CreatePublication() {
  const navigate = useNavigate()

  const crear = async (formulario) => {
    try {
      const datos = new FormData()
      datos.append('titulo_publicacion', formulario.titulo.trim())
      datos.append('descripcion_publicacion', formulario.descripcion.trim())
      datos.append('valor_publicacion', Number(formulario.precio))
      datos.append('stock_publicacion', Number(formulario.stock) || 0)
      datos.append('id_categoria', Number(formulario.idCategoria))
      if (formulario.archivo) datos.append('imagen', formulario.archivo)

      await api.post('/publicaciones', datos)
      navigate('/mis-publicaciones')
    } catch (err) {
      throw new Error(mensajeError(err, 'No se pudo crear la publicación.'))
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
                Crear publicación
              </h2>
              <p className="text-muted mb-4">
                Completa los datos de tu producto para publicarlo en Arotopía.
              </p>

              <PublicationForm textoBoton="Publicar producto" onGuardar={crear} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreatePublication
