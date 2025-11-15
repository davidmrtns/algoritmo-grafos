from spotipy.cache_handler import CacheHandler


class CustomCacheHandler(CacheHandler):
    def __init__(self):
        self.cache = {}

    def get_cached_token(self):
        pass

    def save_token_to_cache(self, token_info):
        pass
