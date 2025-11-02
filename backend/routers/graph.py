from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from db.connection import get_session
from services.services import add_graph_to_db, parse_graph_from_db
from utils.spotify_client import get_access_token, get_current_user_id_and_name, get_user_top_artists


router = APIRouter()

@router.get("/access_token")
async def access_token():
    token_info = await get_access_token()
    if token_info:
        return token_info
    return {"error": "Could not retrieve access token"}

@router.get("/user_info")
async def get_user_info():
    user_id, name = await get_current_user_id_and_name()
    return {"user_id": user_id, "name": name}

@router.get("/common-artists")
async def common_artists(
        graph_id: str | None = None,
        db: Session = Depends(get_session)
):
    user_id, name = await get_current_user_id_and_name()

    artists = await get_user_top_artists()
    if len(artists) > 0:
        graph = add_graph_to_db(user_id, name, artists, graph_id, db)
        if graph:
            return graph.id

    return None

@router.get("/get/{graph_id}")
async def get_graph(
        graph_id: str,
        db: Session = Depends(get_session)
):
    graph = parse_graph_from_db(graph_id, db)
    if graph:
        return graph
    return None