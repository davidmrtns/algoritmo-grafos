from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import spotify


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(spotify.router, prefix="/spotify", tags=["Spotify"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
