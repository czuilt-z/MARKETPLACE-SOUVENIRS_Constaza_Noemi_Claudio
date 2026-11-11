-- Datos iniciales para la base de datos "marketplace".
-- Ejecutar DESPUÉS de Documentation/02_DATABASE/Script-BBDD-marketplace.sql

-- Roles (los ids se usan en Backend/src/utils/roles.js)
-- "Usuario" puede comprar y vender; "Administrador" puede hacer todo
INSERT INTO Rol (id_rol, tipo_rol) VALUES
  (1, 'Administrador'),
  (2, 'Usuario')
ON CONFLICT DO NOTHING;
SELECT setval(pg_get_serial_sequence('rol', 'id_rol'), (SELECT MAX(id_rol) FROM Rol));

INSERT INTO Region (nombre_region) VALUES
  ('Metropolitana de Santiago'),
  ('Valparaíso'),
  ('Biobío')
ON CONFLICT DO NOTHING;

INSERT INTO Comuna (nombre_comuna, id_region) VALUES
  ('Puente Alto', 1),
  ('La Florida', 1),
  ('Santiago', 1),
  ('Providencia', 1),
  ('Valparaíso', 2),
  ('Viña del Mar', 2),
  ('Concepción', 3),
  ('Talcahuano', 3)
ON CONFLICT DO NOTHING;

INSERT INTO Categoria (categoria, descripcion) VALUES
  ('Artesanía', 'Productos hechos a mano'),
  ('Decoración', 'Objetos decorativos'),
  ('Souvenirs', 'Recuerdos y regalos'),
  ('Accesorios', 'Aros, collares y otros accesorios')
ON CONFLICT DO NOTHING;

-- Usuario administrador inicial
-- email: admin@arotopia.cl / contraseña: Admin123
INSERT INTO Usuario (nombre_usuario, apellido_usuario, direccion_usuario, email_usuario,
                     contrasena_usuario, telefono_usuario, id_rol, id_comuna)
VALUES ('Admin', 'Arotopía', 'Sin dirección', 'admin@arotopia.cl',
        '$2b$10$S9pWwcqlARQ14w1rA8weved0mhHCyRgyr7Iqflv7JshiAcL.i18rO', NULL, 1, 1)
ON CONFLICT (email_usuario) DO NOTHING;

-- Usuarios de demostración
-- vendedor@arotopia.cl / Vendedor123  ·  cliente@arotopia.cl / Cliente123
INSERT INTO Usuario (nombre_usuario, apellido_usuario, direccion_usuario, email_usuario,
                     contrasena_usuario, telefono_usuario, id_rol, id_comuna)
VALUES
  ('Vale', 'Tejedora', 'Av. Central 123', 'vendedor@arotopia.cl',
   '$2b$10$QPxrd4iFb3PYCFXbPDFCEu5JVhkK7ma6x7ylO.4uKH71UVkpy5V.C', '912345678', 2, 1),
  ('Camila', 'Compradora', 'Los Aromos 456', 'cliente@arotopia.cl',
   '$2b$10$UlzU7WD62NO6RHyLLqY.HOERFKxs/oPcAa1MlqWr36qLOvrrlKRjK', '987654321', 2, 2)
ON CONFLICT (email_usuario) DO NOTHING;


-- Las imágenes están en Frontend/public/imagenes
DO $$
DECLARE
  v_vendedor INTEGER;
  v_pub INTEGER;
  p RECORD;
BEGIN
  SELECT id_usuario INTO v_vendedor FROM Usuario WHERE email_usuario = 'vendedor@arotopia.cl';

  IF EXISTS (SELECT 1 FROM Publicacion WHERE id_usuario = v_vendedor) THEN
    RETURN;
  END IF;

  FOR p IN
    SELECT * FROM (VALUES
      ('Amigurumi Batman', 'Amigurumi tejido a crochet, ideal para regalar.', 5990, 8, 'Artesanía', '/imagenes/Batman.jpeg'),
      ('Aros Totoro', 'Aros livianos pintados a mano.', 7990, 10, 'Accesorios', '/imagenes/Totoro.jpeg'),
      ('Aros Venasaur', 'Aros inspirados en Pokémon, hechos a mano.', 8990, 6, 'Accesorios', '/imagenes/venasur.jpeg'),
      ('Amigurumi Spiderman', 'Un recuerdo único para cualquier ocasión.', 6990, 5, 'Artesanía', '/imagenes/Spiderman.jpeg'),
      ('Aros Chikorita', 'Producto elaborado de manera artesanal.', 7990, 7, 'Accesorios', '/imagenes/Chikorita.jpeg'),
      ('Aros de flores', 'Aros con flores prensadas y resina.', 9990, 4, 'Accesorios', '/imagenes/flores.jpeg'),
      ('Figura Terminator', 'Una pieza especial para los amantes del cine.', 8990, 3, 'Decoración', '/imagenes/Terminator.jpeg'),
      ('Amigurumi Grogu', 'Amigurumi tejido con hilo de algodón.', 9990, 6, 'Artesanía', '/imagenes/grogu.jpeg'),
      ('Aros Espeon', 'Aros ilustrados y barnizados a mano.', 7990, 9, 'Accesorios', '/imagenes/Espeon.jpeg'),
      ('Macetero Monstera', 'Decoración inspirada en la naturaleza.', 12990, 4, 'Decoración', '/imagenes/Monstera.jpeg'),
      ('Aros Oni', 'Aros con diseño de máscara japonesa.', 8490, 5, 'Accesorios', '/imagenes/Oni.jpeg'),
      ('Amigurumi Luigi', 'Amigurumi de colección hecho a mano.', 6990, 4, 'Souvenirs', '/imagenes/Luigi.jpeg')
    ) AS t(titulo, descripcion, valor, stock, categoria, imagen)
  LOOP
    INSERT INTO Publicacion (titulo_publicacion, descripcion_publicacion, valor_publicacion,
                             stock_publicacion, id_usuario, id_categoria)
    VALUES (p.titulo, p.descripcion, p.valor, p.stock, v_vendedor,
            (SELECT id_categoria FROM Categoria WHERE categoria = p.categoria))
    RETURNING id_publicacion INTO v_pub;

    INSERT INTO img_publicacion (id_publicacion, url_img) VALUES (v_pub, p.imagen);
  END LOOP;
END $$;
