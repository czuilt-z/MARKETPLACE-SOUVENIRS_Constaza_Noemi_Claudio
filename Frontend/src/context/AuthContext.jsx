import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axiosConfig'
import { ROLES } from '../api/utils'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    return usuarioGuardado && localStorage.getItem('token') ? JSON.parse(usuarioGuardado) : null
  })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('usuario')
    }
  }, [usuario])

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem('token')
    setUsuario(null)
  }, [])

    useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (respuesta) => respuesta,
      (error) => {
          if (error.response?.status === 401 && localStorage.getItem('token')) {
          cerrarSesion()
        }
        return Promise.reject(error)
      }
    )
    return () => api.interceptors.response.eject(interceptor)
  }, [cerrarSesion])

  // POST /auth/login
  const iniciarSesion = async (email, password) => {
    const { data } = await api.post('/auth/login', {
      email_usuario: email,
      contrasena_usuario: password,
    })
    localStorage.setItem('token', data.token)
    setUsuario({ ...data.usuario, email })
    return data.usuario
  }

  // POST /auth/registro y luego inicia sesión
  const registrar = async (datos) => {
    await api.post('/auth/registro', datos)
    return iniciarSesion(datos.email_usuario, datos.contrasena_usuario)
  }

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario((usuarioActual) => ({
      ...usuarioActual,
      ...nuevosDatos,
    }))
  }

  const esAdmin = usuario?.id_rol === ROLES.ADMINISTRADOR
  
  // Toda cuenta puede comprar y vender; el administrador además administra todo
  const puedeComprar = Boolean(usuario)
  const puedePublicar = Boolean(usuario)

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        registrar,
        cerrarSesion,
        actualizarUsuario,
        esAdmin,
        puedeComprar,
        puedePublicar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
