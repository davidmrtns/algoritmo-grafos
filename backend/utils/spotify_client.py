import os
from typing import Optional, Tuple
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

from utils.custom_cache_handler import CustomCacheHandler


load_dotenv()

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

SCOPE = ["user-library-read", "user-top-read"]


class SpotifyClient:
    def __init__(self, access_token: str | None = None):
        self.sp_oauth_manager = SpotifyOAuth(
            client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=SPOTIFY_REDIRECT_URI, scope=SCOPE, cache_handler=CustomCacheHandler()
        )
        self.sp = spotipy.Spotify(auth=access_token, auth_manager=self.sp_oauth_manager)

    async def get_access_token(self):
        token_info = self.sp_oauth_manager.get_access_token(as_dict=True)
        if not token_info:
            return None
        return token_info

    async def get_current_user_id_and_name(self) -> Tuple[Optional[str], Optional[str]]:
        user_id = None
        name = None

        user_profile = self.sp.current_user()
        if user_profile:
            user_id = user_profile.get('id')
            name = user_profile.get('display_name')

        return user_id, name

    async def get_user_top_artists(self) -> list[dict]:
        artists = []
        results = self.sp.current_user_top_artists(limit=10, time_range='medium_term')
        for artist in results['items']:
            artist_obj = {
                "id": artist['id'],
                "name": artist['name'],
                "imageUrl": artist['images'][1]['url'] if artist['images'] else None,
                "profileUrl": artist['external_urls']['spotify'],
                "isUser": False
            }
            artists.append(artist_obj)
        return artists

    async def get_saved_tracks(self):
        results = self.sp.current_user_saved_tracks()
        for idx, item in enumerate(results['items']):
            track = item['track']
            print(idx, track['artists'][0]['name'], " – ", track['name'])
