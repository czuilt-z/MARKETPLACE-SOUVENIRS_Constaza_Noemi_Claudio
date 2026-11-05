import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('usuario')
    }
  }, [usuario])

  const iniciarSesion = (email) => {
    setUsuario({ email })
  }

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario((usuarioActual) => ({
      ...usuarioActual,
      ...nuevosDatos,
    }))
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{ usuario, iniciarSesion, cerrarSesion, actualizarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
