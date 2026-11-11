
# Arotopía – Marketplace de souvenirs

Proyecto con frontend en React (Vite) y backend en Node.js + Express, conectado a PostgreSQL y con autenticación JWT.

## Requisitos

- Node.js 18 o superior
- PostgreSQL (con pgAdmin o `psql`)

## 1. Crear la base de datos

En pgAdmin (o `psql`), ejecutar en este orden:

1. `Documentation/02_DATABASE/Script-BBDD-marketplace.sql`
   Crea la base `marketplace`. Después hay que conectarse a ella y ejecutar el resto del script, que crea las tablas.
2. `Backend/db/datos.sql`
   Carga los roles, regiones, comunas, categorías, usuarios de prueba y productos de ejemplo.

## 2. Configurar el backend

Crear el archivo `Backend/.env` con este contenido, completando la contraseña de PostgreSQL:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contrasena
DB_NAME=marketplace

JWT_SECRET=una_clave_secreta_larga
JWT_EXPIRES_IN=2h

# Orígenes permitidos por CORS (puertos del frontend), separados por coma
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

## 3. Levantar el backend

```bash
cd Backend
npm install
npm run dev
```

La API queda en http://localhost:3000. Al abrir esa dirección debe responder:
`{"mensaje":"API Marketplace Arotopía funcionando"}`

## 4. Levantar el frontend

En **otra terminal**:

```bash
cd Frontend
npm install
npm run dev
```

La página queda en http://localhost:5173.

> Si Vite usa otro puerto (por ejemplo 5174, porque el 5173 está ocupado), ese puerto tiene que estar en `CORS_ORIGIN` del `Backend/.env`. Si no, la página no carga los productos.
.

## Cuentas de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@arotopia.cl | Admin123 |
| Usuario (con productos publicados) | vendedor@arotopia.cl | Vendedor123 |
| Usuario (sin  publicaciones) | cliente@arotopia.cl | Cliente123 |

- **Usuario:** puede comprar y vender. Tiene carrito y "Mis publicaciones", pero no puede comprar sus propias publicaciones.
- **Administrador:** puede hacer todo: editar y eliminar publicaciones de cualquier usuario, y administrar usuarios y roles.

## Tests del backend

Con PostgreSQL encendido y la base ya creada:

```bash
cd Backend
npm test
```
