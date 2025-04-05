# SistemaDeVentasEntradaEventos
 La empresa Eventia organiza conciertos, conferencias y festivales. Desean una plataforma para venta de entradas en línea, con cupos limitados, aplicación de descuentos especiales y diferentes tipos de boletos. Se espera permitir a los usuarios ver un calendario de eventos, comprar entradas y recibir comprobantes electrónicos.

1. Identificación de Actores
Usuario anónimo: puede ver eventos pero no comprar.

Usuario autenticado: puede comprar, ver historial, aplicar descuentos.

Administrador/Eventia (posiblemente): gestiona eventos, boletos y descuentos.

🧠 2. Módulos Principales del Sistema
Módulo	Funcionalidad Principal
Autenticación	Registro, login seguro, verificación de correo
Gestión de Eventos	Creación/listado de eventos, visualización pública
Venta de Entradas	Selección de cantidad, verificación de cupos, compra
Descuentos	Validación y aplicación de códigos
Historial	Consulta de compras anteriores, descargas de comprobantes
Notificaciones	Envío de confirmaciones por correo
🏗️ 3. Relaciones entre Entidades (Modelo de Datos conceptual)
Imaginemos las tablas o entidades más importantes:

Usuario

id, nombre, email, contraseña, verificado

Evento

id, nombre, fecha, hora, lugar, precio base, cupos totales

Entrada

id, id_usuario, id_evento, cantidad, precio_total, estado (comprado, cancelado)

Descuento

id, código, porcentaje o monto, uso disponible, fecha expiración

Compra

id, usuario, total, fecha, entradas asociadas

🔁 4. Flujos de Usuario
📥 Registro e Inicio de Sesión
Usuario se registra → verifica email → inicia sesión

Se protege con seguridad (hash, tokens, etc.)

📆 Consulta de Eventos
Usuario (logueado o no) consulta lista o calendario

Puede filtrar por fecha, lugar, disponibilidad

🎟️ Compra de Entradas
Usuario elige evento y número de entradas

Sistema verifica si hay cupos → calcula total → permite aplicar descuento

Se confirma → guarda compra y entradas → envía correo

💸 Aplicación de Descuento
Usuario introduce código antes de pagar

Se valida (vigencia, usos) → se aplica al total

📚 Historial de Compras
Usuario entra a su perfil

Ve lista de entradas compradas (evento, fecha, estado)

Puede descargar comprobantes digitales

⚠️ 5. Retos que se deben contemplar
Evitar sobreventa de entradas (transacciones atómicas o bloqueo de cupos).

Controlar la validez de los descuentos (no repetir, no usar vencidos).

Asegurar la confirmación de compra y notificación al usuario.

Implementar seguridad en el login y en los datos personales.

Mantener claridad en los estados de compra y fechas de eventos.

🧪 6. Criterios para testear después
¿El sistema evita comprar entradas si no hay cupos?

¿Los descuentos aplican solo cuando son válidos?

¿Las compras se registran con todos los datos necesarios?

¿El historial muestra solo compras del usuario autenticado?

¿El calendario de eventos se actualiza automáticamente?