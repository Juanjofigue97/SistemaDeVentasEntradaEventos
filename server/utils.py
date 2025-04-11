import smtplib
import qrcode
import uuid
from database import SessionLocal
from models import Event, User
from schemas import TicketOut
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from io import BytesIO

def send_email(ticket: TicketOut, user_id):
    db = SessionLocal()
    try:
        # Verificar que el evento exista
        event = db.query(Event).filter(Event.id == ticket.event_id).first()
        user = db.query(User).filter(User.id == user_id).first()
        
        if not event or not user:
            return {"success": False, "error": "Evento o usuario no encontrado"}
        
        subject = f'Confirmacion de compra para {event.name}'
        body = f'''
        Hola {user.name},
        
        Gracias por tu compra.
        
        Detalles del ticket
        - Evento: {event.name}
        - Fecha del evento: {event.date}
        - Cantidad de entradas: {ticket.quantity}
        - Precio total: ${ticket.total_price}
        - Fecha de compra: {ticket.purchase_date}

        Adjuntamos tus entradas con códigos QR únicos para cada una. Preséntalos el día del evento.

        ¡Nos vemos pronto!'''

        message = MIMEMultipart()
        message['From'] = 'felipeortega1996@gmail.com'
        message['To'] = user.email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        for i in range(ticket.quantity):
            qr_id = str(uuid.uuid4())
            qr_data = f'entrada_id:{qr_id},evento:{event.id},usuario:{user.id}'
            qr = qrcode.make(qr_data)

            img_io = BytesIO()
            qr.save(img_io, format='PNG')
            img_io.seek(0)

            img = MIMEImage(img_io.read(), name=f'entrada_{i+1}.png')
            img.add_header('Content-ID', f'<entrada_{i+1}>')
            img.add_header('Content-Disposition', 'attachment', filename=f'entrada_{i+1}.png')
            message.attach(img)

        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login('felipeortega1996@gmail.com', 'crce zgzr bsdy esoc')
            server.send_message(message)

        return {"success": True}

    except Exception as e:
        print('Error', {e})
        return {"success": False, "error": str(e)}
    finally:
        db.close