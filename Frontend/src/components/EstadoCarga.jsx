function EstadoCarga({ cargando, error, children }) {
  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" style={{ color: '#A65F67' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-warning text-center my-4" role="alert">
        {error}
      </div>
    )
  }

  return children
}

export default EstadoCarga
