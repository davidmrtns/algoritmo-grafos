import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth


load_dotenv()
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")


scope = ["user-library-read", "user-top-read"]

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=SPOTIFY_REDIRECT_URI, scope=scope
))

async def get_user_top_artists() -> list[str]:
    artists = []
    results = sp.current_user_top_artists(limit=10, time_range='medium_term')
    for artist in results['items']:
        artist_obj = {
            "id": artist['id'],
            "name": artist['name'],
            "imageUrl": artist['images'][1]['url'] if artist['images'] else None,
            "profileUrl": artist['href'],
            "isUser": False
        }
        artists.append(artist_obj)
    return artists

async def get_saved_tracks():
    results = sp.current_user_saved_tracks()
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])
