import { API_URL } from './axiosConfig'

export const ROLES = {
  ADMINISTRADOR: 1, // administrar usuarios y publicaciones
  USUARIO: 2, // puede comprar y vender
}

export const NOMBRE_ROL = {
  1: 'Administrador',
  2: 'Usuario',
}

export const IMAGEN_POR_DEFECTO = 'https://placehold.co/300x400?text=Sin+imagen'

export function urlImagen(url) {
  if (!url) return IMAGEN_POR_DEFECTO
  return url.startsWith('/uploads/') ? `${API_URL}${url}` : url
}

export function adaptarPublicacion(p) {
  return {
    id: p.id_publicacion,
    titulo: p.titulo_publicacion,
    descripcion: p.descripcion_publicacion || '',
    precio: Number(p.valor_publicacion),
    stock: p.stock_publicacion,
    estado: p.estado_publicacion,
    idCategoria: p.id_categoria,
    idUsuario: p.id_usuario,
    imagenes: p.imagenes || [],
    imagen: urlImagen(p.imagenes?.[0]?.url_img),
  }
}

export function mensajeError(error, porDefecto = 'Ocurrió un error, intenta nuevamente.') {
  if (!error.response) {
    return 'No se pudo conectar con el servidor. ¿Está encendido el backend?'
  }
  return error.response.data?.error || porDefecto
}

export const formatearPrecio = (valor) => `$${Number(valor).toLocaleString('es-CL')}`
