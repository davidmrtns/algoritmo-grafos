from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from db.connection import get_session
from services.services import add_graph_to_db
from utils.spotify_client import get_current_user_id_and_name, get_user_top_artists


router = APIRouter()

@router.get("/status")
def spotify_status():
    return {"status": "Spotify router is working"}

@router.get("/user_info")
async def get_user_info():
    user_id, name = await get_current_user_id_and_name()
    return {"user_id": user_id, "name": name}

@router.get("/top-artists")
async def user_top_artists(
        db: Session = Depends(get_session)
):
    user_id, name = await get_current_user_id_and_name()

    artists = await get_user_top_artists()
    if len(artists) > 0:
        graph = add_graph_to_db(user_id, name, artists, db)
        if graph:
            return graph.id

    return None