from fastapi import APIRouter, HTTPException, Response
from fastapi.params import Depends, Cookie
from sqlalchemy.orm import Session
from db.connection import get_session
from services.services import add_graph_to_db, parse_graph_from_db
from utils.spotify_client import SpotifyClient
from utils.token_utils import create_token, decode_token


router = APIRouter()

async def get_spotify_client(token: str = Cookie(None, alias="spotify_access_token")) -> SpotifyClient:
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized: No Spotify access token provided")
    
    decoded_token = decode_token(token)
    if not decoded_token:
        raise HTTPException(status_code=401, detail="Unauthorized: Invalid or expired Spotify access token")
    
    return SpotifyClient(access_token=decoded_token.get("access_token"))


@router.get("/access_token")
async def access_token(response: Response):
    sp = SpotifyClient()
    token_info = await sp.get_access_token()
    if token_info:
        encoded_token = create_token(token_info)
        response.set_cookie(key="spotify_access_token", value=encoded_token, httponly=True, secure=True, samesite="none")
        return {"authenticated": True}
    return {"error": "Could not retrieve access token"}

@router.get("/user_info")
async def get_user_info(sp: SpotifyClient = Depends(get_spotify_client)):
    user_id, name = await sp.get_current_user_id_and_name()
    return {"user_id": user_id, "name": name}

@router.get("/common-artists")
async def common_artists(
        graph_id: str | None = None,
        sp: SpotifyClient = Depends(get_spotify_client),
        db: Session = Depends(get_session)
):
    user_id, name = await sp.get_current_user_id_and_name()

    artists = await sp.get_user_top_artists()
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

@router.delete("/logout")
async def logout(response: Response):
    response.delete_cookie(key="spotify_access_token")
    return {"authenticated": False}
