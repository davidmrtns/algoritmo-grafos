import os
import time
from dotenv import load_dotenv
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_session():
    MAX_ATTEMPTS = 3
    RETRY_DELAY = 5
    attempt = 0

    while attempt < MAX_ATTEMPTS:
        db = SessionLocal()
        try:
            yield db
            return
        except (psycopg2.OperationalError, OperationalError) as e:
            db.rollback()
            print(f"Error while trying to connect to the database: {e}. Attempt {attempt + 1} of {MAX_ATTEMPTS}")
            attempt += 1
            time.sleep(RETRY_DELAY)
            engine.dispose()
        finally:
            db.close()
    raise Exception("Couldn't stablish a connection with the database after {MAX_RETRIES} attempts.")
