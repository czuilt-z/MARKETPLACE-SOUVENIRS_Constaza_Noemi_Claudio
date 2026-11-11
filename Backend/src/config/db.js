require('dotenv').config({ quiet: true })
const { Pool } = require('pg')

// Conexión a PostgreSQL con los datos del archivo .env
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'marketplace',
  allowExitOnIdle: true,
})

module.exports = pool
