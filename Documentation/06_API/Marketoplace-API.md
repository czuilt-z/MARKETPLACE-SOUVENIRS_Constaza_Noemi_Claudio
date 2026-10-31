# 📄 API CONTRACT - MARKETPLACE


## 🔐 Authentication

La API utiliza autenticación mediante JWT (JSON Web Token).

Las rutas privadas requieren enviar el token en el encabezado:

```http
Authorization: Bearer <token>
```

Roles del sistema:
- **Administrador:** administra usuarios, modifica roles y gestiona publicaciones.
- **Vendedor:** crea, edita y elimina sus propias publicaciones.
- **Cliente:** consulta publicaciones y administra su carrito.

---

## 👥 Usuarios

### `POST /auth/registro`

- **Auth Required:** `false`
- **Descripción:** Registra un nuevo cliente o vendedor.

**Request:**

```json
{
  "nombre_usuario": "Juan",
  "apellido_usuario": "Pérez",
  "direccion_usuario": "Av. Central 123",
  "email_usuario": "juan@gmail.com",
  "contrasena_usuario": "Clave123",
  "telefono_usuario": "912345678",
  "id_rol": 3,
  "id_comuna": 1
}
```

**Response:**

```json
{
  "mensaje": "Usuario registrado correctamente",
  "id_usuario": 1
}
```

### `POST /auth/login`

- **Auth Required:** `false`
- **Descripción:** Permite iniciar sesión y obtener un token JWT.

**Request:**

```json
{
  "email_usuario": "juan@gmail.com",
  "contrasena_usuario": "Clave123"
}
```

**Response:**

```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "JWT_GENERADO_POR_EL_BACKEND",
  "usuario": {
    "id_usuario": 1,
    "nombre_usuario": "Juan",
    "id_rol": 3
  }
}
```

### `GET /usuarios`

- **Auth Required:** `true` (Token)
- **Role Required:** Administrador
- **Descripción:** Obtiene el listado de usuarios registrados.

**Response:**

```json
[
  {
    "id_usuario": 1,
    "nombre_usuario": "Juan",
    "apellido_usuario": "Pérez",
    "email_usuario": "juan@gmail.com",
    "telefono_usuario": "912345678",
    "id_rol": 3,
    "id_comuna": 1,
    "fecha_registro": "2026-10-30T10:00:00"
  }
]
```

### `GET /usuarios/:id_usuario`

- **Auth Required:** `true` (Token)
- **Role Required:** Propietario del perfil o administrador.
- **Descripción:** Obtiene los datos de un usuario.

**Response:**

```json
{
  "id_usuario": 1,
  "nombre_usuario": "Juan",
  "apellido_usuario": "Pérez",
  "direccion_usuario": "Av. Central 123",
  "email_usuario": "juan@gmail.com",
  "telefono_usuario": "912345678",
  "id_rol": 3,
  "id_comuna": 1,
  "fecha_registro": "2026-10-30T10:00:00"
}
```

### `PUT /usuarios/:id_usuario`

- **Auth Required:** `true` (Token)
- **Role Required:** Propietario del perfil o administrador.
- **Descripción:** Actualiza los datos del usuario.

**Request:**

```json
{
  "nombre_usuario": "Juan",
  "apellido_usuario": "Pérez",
  "direccion_usuario": "Av. Nueva 456",
  "email_usuario": "juan.nuevo@gmail.com",
  "telefono_usuario": "987654321",
  "id_comuna": 2
}
```

**Response:**

```json
{
  "mensaje": "Usuario actualizado correctamente"
}
```

### `PATCH /usuarios/:id_usuario/rol`

- **Auth Required:** `true` (Token)
- **Role Required:** Administrador
- **Descripción:** Modifica el rol de un usuario.

**Request:**

```json
{
  "id_rol": 2
}
```

**Response:**

```json
{
  "mensaje": "Rol actualizado correctamente"
}
```

### `DELETE /usuarios/:id_usuario`

- **Auth Required:** `true` (Token)
- **Role Required:** Administrador
- **Descripción:** Elimina un usuario.

**Response:**

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

---

## 📦 Publicaciones

### `GET /publicaciones`

- **Auth Required:** `false`
- **Descripción:** Obtiene las publicaciones activas.
- **Query Params:** `id_categoria`, `busqueda` (opcionales).

**Response:**

```json
[
  {
    "id_publicacion": 1,
    "titulo_publicacion": "Bicicleta de montaña",
    "descripcion_publicacion": "Bicicleta en excelente estado",
    "valor_publicacion": 150000,
    "stock_publicacion": 5,
    "estado_publicacion": "activa",
    "id_usuario": 2,
    "id_categoria": 1,
    "imagenes": [
      {
        "id_imgen_publicacion": 1,
        "url_img": "https://ejemplo.com/bicicleta.jpg"
      }
    ]
  }
]
```

### `GET /publicaciones/:id_publicacion`

- **Auth Required:** `false`
- **Descripción:** Obtiene el detalle de una publicación.

**Response:**

```json
{
  "id_publicacion": 1,
  "titulo_publicacion": "Bicicleta de montaña",
  "descripcion_publicacion": "Bicicleta en excelente estado",
  "valor_publicacion": 150000,
  "stock_publicacion": 5,
  "estado_publicacion": "activa",
  "id_usuario": 2,
  "id_categoria": 1,
  "imagenes": [
    {
      "id_imgen_publicacion": 1,
      "url_img": "https://ejemplo.com/bicicleta.jpg"
    }
  ]
}
```

### `POST /publicaciones`

- **Auth Required:** `true` (Token)
- **Role Required:** Vendedor
- **Descripción:** Crea una nueva publicación. El usuario propietario se obtiene del token.

**Request:**

```json
{
  "titulo_publicacion": "Bicicleta de montaña",
  "descripcion_publicacion": "Bicicleta en excelente estado",
  "valor_publicacion": 150000,
  "stock_publicacion": 5,
  "id_categoria": 1,
  "imagenes": [
    "https://ejemplo.com/bicicleta.jpg"
  ]
}
```

**Response:**

```json
{
  "mensaje": "Publicación creada correctamente",
  "id_publicacion": 1
}
```

### `PUT /publicaciones/:id_publicacion`

- **Auth Required:** `true` (Token)
- **Role Required:** Vendedor propietario o administrador.
- **Descripción:** Actualiza una publicación existente.

**Request:**

```json
{
  "titulo_publicacion": "Bicicleta de montaña actualizada",
  "descripcion_publicacion": "Bicicleta en excelente estado",
  "valor_publicacion": 140000,
  "stock_publicacion": 4,
  "id_categoria": 1
}
```

**Response:**

```json
{
  "mensaje": "Publicación actualizada correctamente"
}
```

### `DELETE /publicaciones/:id_publicacion`

- **Auth Required:** `true` (Token)
- **Role Required:** Vendedor propietario o administrador.
- **Descripción:** Elimina o desactiva una publicación. Se recomienda cambiar `estado_publicacion` a `eliminada`.

**Response:**

```json
{
  "mensaje": "Publicación eliminada correctamente"
}
```

---

## 🖼️ Imágenes

### `POST /publicaciones/:id_publicacion/imagenes`

- **Auth Required:** `true` (Token)
- **Role Required:** Vendedor propietario o administrador.
- **Descripción:** Agrega una imagen a una publicación.

**Request:**

```json
{
  "url_img": "https://ejemplo.com/imagen.jpg"
}
```

**Response:**

```json
{
  "mensaje": "Imagen agregada correctamente",
  "id_imgen_publicacion": 1
}
```

### `DELETE /imagenes/:id_imgen_publicacion`

- **Auth Required:** `true` (Token)
- **Role Required:** Vendedor propietario o administrador.
- **Descripción:** Elimina una imagen de una publicación.

**Response:**

```json
{
  "mensaje": "Imagen eliminada correctamente"
}
```

---

## 🛒 Carrito de compras

### `GET /carrito`

- **Auth Required:** `true` (Token)
- **Role Required:** Cliente
- **Descripción:** Obtiene los productos del carrito del usuario autenticado.

**Response:**

```json
{
  "id_carro": 1,
  "productos": [
    {
      "id_detalle_carro": 1,
      "id_publicacion": 2,
      "titulo_publicacion": "Audífonos",
      "valor_publicacion": 25000,
      "cantidad": 2,
      "subtotal": 50000
    }
  ]
}
```

### `POST /carrito`

- **Auth Required:** `true` (Token)
- **Role Required:** Cliente
- **Descripción:** Agrega una publicación al carrito. Si el producto ya existe, se puede actualizar su cantidad.

**Request:**

```json
{
  "id_publicacion": 2,
  "cantidad": 1
}
```

**Response:**

```json
{
  "mensaje": "Producto agregado al carrito correctamente"
}
```

### `PATCH /carrito/:id_detalle_carro`

- **Auth Required:** `true` (Token)
- **Role Required:** Cliente
- **Descripción:** Modifica la cantidad de un producto del carrito.

**Request:**

```json
{
  "cantidad": 3
}
```

**Response:**

```json
{
  "mensaje": "Cantidad actualizada correctamente"
}
```

### `DELETE /carrito/:id_detalle_carro`

- **Auth Required:** `true` (Token)
- **Role Required:** Cliente
- **Descripción:** Elimina un producto del carrito.

**Response:**

```json
{
  "mensaje": "Producto eliminado del carrito correctamente"
}
```

### `DELETE /carrito/vaciar`

- **Auth Required:** `true` (Token)
- **Role Required:** Cliente
- **Descripción:** Elimina todos los productos del carrito sin eliminar el registro del carrito.

**Response:**

```json
{
  "mensaje": "Carrito vaciado correctamente"
}
```

---

## 📍 Ubicación

### `GET /regiones`

- **Auth Required:** `false`
- **Descripción:** Obtiene todas las regiones disponibles.

**Response:**

```json
[
  {
    "id_region": 1,
    "nombre_region": "Metropolitana de Santiago"
  }
]
```

### `GET /regiones/:id_region/comunas`

- **Auth Required:** `false`
- **Descripción:** Obtiene las comunas pertenecientes a una región.

**Response:**

```json
[
  {
    "id_comuna": 1,
    "nombre_comuna": "Puente Alto",
    "id_region": 1
  },
  {
    "id_comuna": 2,
    "nombre_comuna": "La Florida",
    "id_region": 1
  }
]
```

---

## ⚠️ Códigos de respuesta HTTP

| Código | Descripción |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado correctamente |
| 400 | Solicitud incorrecta |
| 401 | No autenticado o token inválido |
| 403 | No tiene permisos |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---
