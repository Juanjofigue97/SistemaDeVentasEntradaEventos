from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    identificacion = Column(Integer)
    celular = Column(Integer)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin =Column(Boolean, default=False)

    tickets = relationship("Ticket", back_populates="user")


class Event(Base):
    __tablename__ = 'events'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    date = Column(DateTime)
    location = Column(String)
    price = Column(Float)
    capacity = Column(Integer)
    tickets_sold = Column(Integer, default=0)

    entry_types = relationship("EntryType", back_populates="event", cascade="all, delete")


class Ticket(Base):
    __tablename__ = 'tickets'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    entry_type_id = Column(Integer, ForeignKey("entry_types.id"))
    quantity = Column(Integer)
    total_price = Column(Float)
    purchase_date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="tickets")
    event = relationship("Event")
    entry_type = relationship("EntryType")


class Discount(Base):
    __tablename__ = 'discounts'
    code = Column(String, primary_key=True)
    percentage = Column(Float)
    is_active = Column(Boolean, default=True)

# models administrativos
class EntryType(Base):
    __tablename__ = 'entry_types'
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey('events.id'))
    name = Column(String)  # Ejemplo: "General", "VIP"
    price = Column(Float)
    capacity = Column(Integer)

    event = relationship("Event", back_populates="entry_types")

Event.entry_types = relationship("EntryType", back_populates="event", cascade="all, delete")