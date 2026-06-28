from sqlalchemy import Column, Integer, String
from database import Base

class Reminder(Base):

    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True)
    email = Column(String)
    task = Column(String)
    due_date = Column(String)
    status = Column(String)