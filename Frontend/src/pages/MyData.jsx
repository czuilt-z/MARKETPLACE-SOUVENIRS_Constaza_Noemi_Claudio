import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function MyData() {
/*constante de autentificación temporal*/
  const { usuario, actualizarUsuario } = useAuth()

  const [datos, setDatos] = useState(() => {
    const datosGuardados = localStorage.getItem('datosPersonales')

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : {
          nombre: '',
          apellido: '',
          email: usuario?.email || '',
          telefono: '',
          direccion: '',
        }
  })


  const handleChange = (e) => {
    const { name, value } = e.target

    setDatos((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    localStorage.setItem('datosPersonales', JSON.stringify(datos))

    actualizarUsuario({ email: datos.email })

    alert('Tus datos se han guardado correctamente.')
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: '16px',
              backgroundColor: '#FFF9F5',
            }}
          >
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4" style={{ color: '#67434A' }}>
                Mis datos
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    name="nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="correo@ejemplo.com"
                    name="email"
                    value={datos.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Ingresa tu teléfono"
                    name="telefono"
                    value={datos.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu dirección"
                    name="direccion"
                    value={datos.direccion}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-arotopia w-100 mt-3">
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MyData