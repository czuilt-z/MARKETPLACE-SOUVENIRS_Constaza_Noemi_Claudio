import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import PublicationForm from '../components/PublicationForm'
import EstadoCarga from '../components/EstadoCarga'
import { usePublicacion } from '../hooks/usePublicaciones'
import { mensajeError } from '../api/utils'

function EditPublication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const volverA = '/mis-publicaciones'

  // GET /publicaciones/:id
  const { publicacion, cargando } = usePublicacion(id)

  const guardar = async (formulario) => {
    try {
      // PUT /publicaciones/:id
      await api.put(`/publicaciones/${id}`, {
        titulo_publicacion: formulario.titulo.trim(),
        descripcion_publicacion: formulario.descripcion.trim(),
        valor_publicacion: Number(formulario.precio),
        stock_publicacion: Number(formulario.stock) || 0,
        id_categoria: Number(formulario.idCategoria),
      })

       if (formulario.archivo) {
        const datos = new FormData()
        datos.append('imagen', formulario.archivo)
        await api.post(`/publicaciones/${id}/imagenes`, datos)

        for (const imagen of publicacion.imagenes) {
          await api.delete(`/imagenes/${imagen.id_imgen_publicacion}`)
        }
      }

      navigate(volverA)
    } catch (err) {
      throw new Error(mensajeError(err, 'No se pudo actualizar la publicación.'))
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <EstadoCarga cargando={cargando}>
            {!publicacion ? (
              <div className="text-center">
                <h2 className="fw-bold mb-3" style={{ color: '#67434A' }}>
                  Publicación no encontrada
                </h2>
                <Link to="/mis-publicaciones" className="btn btn-arotopia">
                  Volver a mis publicaciones
                </Link>
              </div>
            ) : (
              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#FFF9F5',
                }}
              >
                <div className="card-body p-4 p-md-5">
                  <h2 className="fw-bold mb-2" style={{ color: '#67434A' }}>
                    Editar publicación
                  </h2>

                  <p className="text-muted mb-4">
                    Actualiza la información de tu producto y mantén tu publicación al día.
                  </p>

                  <PublicationForm
                    inicial={publicacion}
                    textoBoton="Guardar cambios"
                    onGuardar={guardar}
                  />
                </div>
              </div>
            )}
          </EstadoCarga>
        </div>
      </div>
    </main>
  )
}

export default EditPublication
