from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import graph


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(graph.router, prefix="/graph", tags=["Graph"])

@app.get("/")
def read_root():
    return {"message": "Hello World"}
