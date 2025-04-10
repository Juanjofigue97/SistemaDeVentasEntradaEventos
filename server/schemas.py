from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    identificacion: int
    celular: int
    password: str
    is_admin: bool

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    identificacion: int
    celular: int
    is_admin: bool

    class Config:
        orm_mode = True

class EventOut(BaseModel):
    id: int
    name: str
    description: str
    date: datetime
    location: str
    price: float
    capacity: int
    tickets_sold: int
    image: str
    estado: str

    class Config:
        orm_mode = True

class TicketCreate(BaseModel):
    event_id: int
    entry_type_id: int
    quantity: int
    discount_code: Optional[str]

class TicketOut(BaseModel):
    id: int
    event_id: int
    quantity: int
    total_price: float
    purchase_date: datetime

    class Config:
        orm_mode = True

# schemas administrativos
class EntryTypeCreate(BaseModel):
    event_id: int
    name: str
    price: float
    capacity: int

class EntryTypeOut(BaseModel):
    id: int
    event_id: int
    name: str
    price: float
    capacity: int

    class Config:
        orm_mode = True

class Discount(BaseModel):
    code: str
    percentage: float
    is_active: bool
    
    class Config:
        orm_mode = True
