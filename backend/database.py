from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///career.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
import sqlite3

conn = sqlite3.connect(
    "career_agent.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS applications(
id INTEGER PRIMARY KEY AUTOINCREMENT,
company TEXT,
role TEXT,
status TEXT,
date TEXT
)
""")

conn.commit()
from database import conn, cursor

def save_application(job):

    cursor.execute(
        """
        INSERT INTO applications
        (company,role,status,date)
        VALUES(?,?,?,?)
        """,
        (
            job["company"],
            job["role"],
            job["status"],
            job["date"]
        )
    )

    conn.commit()