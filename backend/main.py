from fastapi import FastAPI
from routers import spotify


app = FastAPI()

app.include_router(spotify.router, prefix="/spotify", tags=["Spotify"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
