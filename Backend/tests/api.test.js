require('dotenv').config({ quiet: true })
const request = require('supertest')
const app = require('../src/app')
const pool = require('../src/config/db')
const { generarToken } = require('../src/utils/jwt')
const ROLES = require('../src/utils/roles')


const tokenUsuario = generarToken({ id_usuario: 999999, id_rol: ROLES.USUARIO })

const emailPrueba = `test_${Date.now()}@arotopia.cl`

afterAll(async () => {
  await pool.query('DELETE FROM Usuario WHERE email_usuario = $1', [emailPrueba])
  await pool.end()
})

describe('Rutas generales', () => {
  it('GET a una ruta inexistente responde 404', async () => {
    const res = await request(app).get('/ruta-que-no-existe')
    expect(res.statusCode).toBe(404)
  })
})

describe('Autenticación /auth', () => {
  it('POST /auth/registro crea un usuario y responde 201', async () => {
    const res = await request(app).post('/auth/registro').send({
      nombre_usuario: 'Test',
      apellido_usuario: 'Prueba',
      direccion_usuario: 'Calle Falsa 123',
      email_usuario: emailPrueba,
      contrasena_usuario: 'Clave123',
    })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id_usuario')
  })

  it('POST /auth/registro pidiendo rol de administrador responde 400', async () => {
    const res = await request(app).post('/auth/registro').send({
      nombre_usuario: 'Test',
      apellido_usuario: 'Admin',
      direccion_usuario: 'Calle Falsa 123',
      email_usuario: `admin_${emailPrueba}`,
      contrasena_usuario: 'Clave123',
      id_rol: ROLES.ADMINISTRADOR,
    })
    expect(res.statusCode).toBe(400)
  })

  it('POST /auth/registro con un email repetido responde 400', async () => {
    const res = await request(app).post('/auth/registro').send({
      nombre_usuario: 'Test',
      apellido_usuario: 'Prueba',
      direccion_usuario: 'Calle Falsa 123',
      email_usuario: emailPrueba,
      contrasena_usuario: 'Clave123',
    })
    expect(res.statusCode).toBe(400)
  })

  it('POST /auth/login con credenciales correctas responde 200 y un token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email_usuario: emailPrueba, contrasena_usuario: 'Clave123' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })

  it('POST /auth/login con contraseña incorrecta responde 401', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email_usuario: emailPrueba, contrasena_usuario: 'incorrecta' })
    expect(res.statusCode).toBe(401)
  })

  it('POST /auth/login sin datos responde 400', async () => {
    const res = await request(app).post('/auth/login').send({})
    expect(res.statusCode).toBe(400)
  })
})

describe('Publicaciones /publicaciones', () => {
  it('GET /publicaciones responde 200 con un arreglo', async () => {
    const res = await request(app).get('/publicaciones')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /publicaciones/:id con un id que no existe responde 404', async () => {
    const res = await request(app).get('/publicaciones/999999')
    expect(res.statusCode).toBe(404)
  })

  it('GET /publicaciones/:id con un id no numérico responde 400', async () => {
    const res = await request(app).get('/publicaciones/abc')
    expect(res.statusCode).toBe(400)
  })

  
  it('POST /publicaciones sin campos obligatorios responde 400', async () => {
    const res = await request(app)
      .post('/publicaciones')
      .set('Authorization', `Bearer ${tokenUsuario}`)
      .send({ descripcion_publicacion: 'Sin título ni precio' })
    expect(res.statusCode).toBe(400)
  })
})

describe('Usuarios /usuarios', () => {
  it('GET /usuarios sin token responde 401', async () => {
    const res = await request(app).get('/usuarios')
    expect(res.statusCode).toBe(401)
  })

  it('GET /usuarios con un token inválido responde 401', async () => {
    const res = await request(app).get('/usuarios').set('Authorization', 'Bearer token_falso')
    expect(res.statusCode).toBe(401)
  })

  it('GET /usuarios con token de usuario (no administrador) responde 403', async () => {
    const res = await request(app).get('/usuarios').set('Authorization', `Bearer ${tokenUsuario}`)
    expect(res.statusCode).toBe(403)
  })

  it('DELETE /usuarios/:id con token de usuario (no administrador) responde 403', async () => {
    const res = await request(app).delete('/usuarios/1').set('Authorization', `Bearer ${tokenUsuario}`)
    expect(res.statusCode).toBe(403)
  })
})

describe('Carrito y ubicación', () => {
  it('GET /carrito sin token responde 401', async () => {
    const res = await request(app).get('/carrito')
    expect(res.statusCode).toBe(401)
  })

  it('GET /regiones responde 200 con un arreglo', async () => {
    const res = await request(app).get('/regiones')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /regiones/:id/comunas de una región inexistente responde 404', async () => {
    const res = await request(app).get('/regiones/999999/comunas')
    expect(res.statusCode).toBe(404)
  })
})
