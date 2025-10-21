from db.connection import Base, engine
from db.models import *


Base.metadata.create_all(bind=engine)