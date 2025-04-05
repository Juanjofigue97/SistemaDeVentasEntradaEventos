# 📊 Esquema de Base de Datos - Eventia

Este documento describe la estructura de las tablas de la base de datos para el sistema de venta de entradas para eventos.

---

## 🧾 Tabla: `usuarios`

| Campo            | Tipo de dato   | PK | FK | Descripción                                      |
|------------------|----------------|----|----|--------------------------------------------------|
| id               | INT / UUID     | ✅ |    | Identificador único del usuario                  |
| nombre           | VARCHAR(100)   |    |    | Nombre completo                                  |
| email            | VARCHAR(150)   |    |    | Correo electrónico único                         |
| contraseña       | VARCHAR(255)   |    |    | Hash de la contraseña                            |
| rol              | VARCHAR(50)    |    |    | Rol del usuario (`admin`, `cliente`, etc.)       |
| cedula           | VARCHAR(20)    |    |    | Documento de identidad                           |
| celular          | VARCHAR(20)    |    |    | Número de contacto                               |
| verificado       | BOOLEAN        |    |    | Si el email está verificado                      |
| fecha_registro   | TIMESTAMP      |    |    | Fecha y hora de creación de la cuenta            |
| ultimo_acceso    | TIMESTAMP      |    |    | Última vez que inició sesión                     |

---

## 🗓️ Tabla: `eventos`

| Campo         | Tipo de dato   | PK | FK | Descripción                         |
|---------------|----------------|----|----|-------------------------------------|
| id            | INT / UUID     | ✅ |    | Identificador del evento            |
| nombre        | VARCHAR(150)   |    |    | Nombre del evento                   |
| descripcion   | TEXT           |    |    | Descripción del evento              |
| fecha         | DATE           |    |    | Fecha del evento                    |
| hora          | TIME           |    |    | Hora del evento                     |
| lugar         | VARCHAR(200)   |    |    | Lugar del evento                    |
| cupo_total    | INT            |    |    | Cantidad máxima de entradas         |
| precio_base   | DECIMAL(10,2)  |    |    | Precio base de la entrada           |
| estado        | VARCHAR(50)    |    |    | Activo, cancelado, finalizado, etc. |

---

## 🛒 Tabla: `compras`

| Campo             | Tipo de dato   | PK | FK | Descripción                                          |
|-------------------|----------------|----|----|------------------------------------------------------|
| id                | INT / UUID     | ✅ |    | Identificador de la compra                          |
| usuario_id        | INT / UUID     |    | ✅ | Referencia a `usuarios(id)`                         |
| fecha_compra      | TIMESTAMP      |    |    | Fecha y hora de la compra                           |
| numero_entradas   | INT            |    |    | Cantidad de entradas compradas                      |
| total             | DECIMAL(10,2)  |    |    | Monto total pagado                                  |
| codigo_descuento  | VARCHAR(50)    |    |    | Código aplicado (si aplica)                         |
| estado            | VARCHAR(50)    |    |    | Estado de la compra: pagada, cancelada, etc.        |

---

## 🎟️ Tabla: `entradas`

| Campo           | Tipo de dato   | PK | FK | Descripción                                           |
|------------------|----------------|----|----|-------------------------------------------------------|
| id               | INT / UUID     | ✅ |    | Identificador interno de la entrada                  |
| identificador    | VARCHAR(100)   |    |    | Código único de la entrada (para QR o validación)    |
| usuario_id       | INT / UUID     |    | ✅ | Referencia a `usuarios(id)`                          |
| evento_id        | INT / UUID     |    | ✅ | Referencia a `eventos(id)`                           |
| compra_id        | INT / UUID     |    | ✅ | Referencia a `compras(id)`                           |
| estado           | VARCHAR(50)    |    |    | Estado: válida, usada, cancelada, etc.               |

---

## 💸 Tabla: `descuentos`

| Campo             | Tipo de dato   | PK | FK | Descripción                                |
|-------------------|----------------|----|----|--------------------------------------------|
| id                | INT / UUID     | ✅ |    | Identificador del descuento                 |
| codigo            | VARCHAR(50)    |    |    | Código único que ingresa el usuario        |
| tipo              | VARCHAR(20)    |    |    | `porcentaje` o `valor_fijo`                |
| valor             | DECIMAL(10,2)  |    |    | Valor del descuento                        |
| fecha_expira      | DATE           |    |    | Fecha de vencimiento del código            |
| usos_disponibles  | INT            |    |    | Cantidad de veces que se puede usar        |

---

## ✅ Opcional: Tabla `verificaciones`

| Campo           | Tipo de dato   | PK | FK | Descripción                                |
|------------------|----------------|----|----|--------------------------------------------|
| id               | INT / UUID     | ✅ |    | Identificador del token                    |
| usuario_id       | INT / UUID     |    | ✅ | Referencia a `usuarios(id)`                |
| token            | VARCHAR(255)   |    |    | Token único enviado por correo             |
| fecha_creacion   | TIMESTAMP      |    |    | Fecha de generación del token              |
| fecha_uso        | TIMESTAMP      |    |    | Fecha en que se usó el token (si aplica)   |

---

