from fastapi import APIRouter
from utils.spotify_client import get_user_top_artists


router = APIRouter()

@router.get("/status")
def spotify_status():
    return {"status": "Spotify router is working"}

@router.get("/top-artists")
async def user_top_artists():
    artists = await get_user_top_artists()
    return artists