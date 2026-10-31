
CREATE DATABASE marketplace;

-- Conectarse a marketplace antes de ejecutar las siguientes instrucciones.


-- =====================================
-- TABLA: Rol
-- =====================================

CREATE TABLE Rol (
    id_rol SERIAL PRIMARY KEY,
    tipo_rol VARCHAR(30) NOT NULL UNIQUE
);


-- =====================================
-- TABLA: Region
-- =====================================

CREATE TABLE Region (
    id_region SERIAL PRIMARY KEY,
    nombre_region VARCHAR(100) NOT NULL UNIQUE
);


-- =====================================
-- TABLA: Comuna
-- =====================================

CREATE TABLE Comuna (
    id_comuna SERIAL PRIMARY KEY,
    nombre_comuna VARCHAR(100) NOT NULL,
    id_region INTEGER NOT NULL,

    FOREIGN KEY (id_region)
        REFERENCES Region(id_region),

    UNIQUE (nombre_comuna, id_region)
);


-- =====================================
-- TABLA: Usuario
-- =====================================

CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    apellido_usuario VARCHAR(100) NOT NULL,
    direccion_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(150) NOT NULL UNIQUE,
    contrasena_usuario VARCHAR(255) NOT NULL,
    telefono_usuario VARCHAR(20),
    id_rol INTEGER NOT NULL,
    id_comuna INTEGER,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_rol)
        REFERENCES Rol(id_rol),

    FOREIGN KEY (id_comuna)
        REFERENCES Comuna(id_comuna)
);


-- =====================================
-- TABLA: Categoria
-- =====================================

CREATE TABLE Categoria (
    id_categoria SERIAL PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);


-- =====================================
-- TABLA: Publicacion
-- =====================================

CREATE TABLE Publicacion (
    id_publicacion SERIAL PRIMARY KEY,
    titulo_publicacion VARCHAR(150) NOT NULL,
    descripcion_publicacion TEXT,
    valor_publicacion NUMERIC(12,2) NOT NULL
        CHECK (valor_publicacion >= 0),
    stock_publicacion INTEGER NOT NULL DEFAULT 0
        CHECK (stock_publicacion >= 0),
    estado_publicacion VARCHAR(20) NOT NULL DEFAULT 'activa',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario),

    FOREIGN KEY (id_categoria)
        REFERENCES Categoria(id_categoria),

    CHECK (
        estado_publicacion IN ('activa', 'pausada', 'eliminada')
    )
);


-- =====================================
-- TABLA: img_publicacion
-- =====================================

CREATE TABLE img_publicacion (
    id_imgen_publicacion SERIAL PRIMARY KEY,
    id_publicacion INTEGER NOT NULL,
    url_img TEXT NOT NULL,

    FOREIGN KEY (id_publicacion)
        REFERENCES Publicacion(id_publicacion)
        ON DELETE CASCADE
);


-- =====================================
-- TABLA: Carro
-- =====================================

CREATE TABLE Carro (
    id_carro SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    

    FOREIGN KEY (id_usuario)
        REFERENCES Usuario(id_usuario)
);


-- =====================================
-- TABLA: Detalle_carro
-- =====================================

CREATE TABLE Detalle_carro (
    id_detalle_carro SERIAL PRIMARY KEY,
    id_carro INTEGER NOT NULL,
    id_publicacion INTEGER NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1
        CHECK (cantidad > 0),

    FOREIGN KEY (id_carro)
        REFERENCES Carro(id_carro)
        ON DELETE CASCADE,

    FOREIGN KEY (id_publicacion)
        REFERENCES Publicacion(id_publicacion),

    UNIQUE (id_carro, id_publicacion)
);