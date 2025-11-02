from sqlalchemy.orm import Session

from db.models import Artist, User, UserArtistAssociation, Graph


def add_user_to_db(user_id: str, name: str, db: Session) -> User:
    user_obj = User(
        id=user_id,
        name=name
    )
    db.add(user_obj)
    db.commit()
    return user_obj


def get_artist_from_db(artist_id: str, db: Session) -> Artist | None:
    artist = db.query(Artist).filter_by(id=artist_id).first()
    return artist


def get_user_artist_assoc_from_db(user_id: str, artist_id: str, db: Session) -> UserArtistAssociation | None:
    user_artist_assoc = db.query(UserArtistAssociation).filter_by(user_id=user_id, artist_id=artist_id).first()
    return user_artist_assoc


def add_graph_to_db(
        user_id: str,
        user_name: str,
        artists: list[dict],
        graph_id: str | None,
        db: Session
) -> Graph | None:
    try:
        user = db.query(User).filter_by(id=user_id).first()
        if not user:
            user = add_user_to_db(user_id, user_name, db)

        for artist in artists:
            artist_obj = get_artist_from_db(artist.get("id"), db)
            if not artist_obj:
                artist_obj = Artist(
                    id=artist.get("id"),
                    name=artist.get("name"),
                    image_url=artist.get("imageUrl"),
                    profile_url=artist.get("profileUrl")
                )

            user_artist_assoc = get_user_artist_assoc_from_db(user.id, artist_obj.id, db)
            if not user_artist_assoc:
                user_artist_assoc = UserArtistAssociation(
                    user_id=user.id,
                    artist_id=artist_obj.id
                )

            db.add(artist_obj)
            db.add(user_artist_assoc)

        if graph_id:
            graph = db.query(Graph).filter_by(id=graph_id).first()
            if graph and graph.user_1_id != user.id and not graph.user_2_id:
                graph.user_2_id = user.id
                db.commit()
                return graph
            # TODO: add else to return none if graph is complete or user is already in graph

        graph = Graph(
            user_1_id=user.id
        )
        db.add(graph)
        db.commit()

        return graph
    except Exception as e:
        db.rollback()
        return None # TODO: handle error properly


def parse_graph_from_db(graph_id: str, db: Session) -> Graph | None:
    graph_parse_obj = {
        "nodes": [],
        "links": []
    }
    
    graph = db.query(Graph).filter_by(id=graph_id).first()
    
    user_1 = db.query(User).filter_by(id=graph.user_1_id).first()
    user_2 = db.query(User).filter_by(id=graph.user_2_id).first()

    user_1_artists = db.query(UserArtistAssociation).filter_by(user_id=user_1.id).all()
    if user_2:
        user_2_artists = db.query(UserArtistAssociation).filter_by(user_id=user_2.id).all()

    all_associations = user_1_artists + (user_2_artists if user_2 else [])
    unique_associations = {assoc.artist_id: assoc for assoc in all_associations}.values()

    graph_parse_obj["nodes"] = [
        _parse_user_node(user_1)
    ] + (
        [_parse_user_node(user_2)] if user_2 else []
    ) + [
        _fetch_artist_details(assoc.artist_id, db) for assoc in unique_associations
    ]

    graph_parse_obj["links"] = [
        {
            "source": assoc.user_id,
            "target": assoc.artist_id
        } for assoc in user_1_artists + (user_2_artists if user_2 else [])
    ]

    return graph_parse_obj


def _parse_user_node(user: User) -> dict:
    return {
        "id": user.id,
        "name": user.name,
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
        "isUser": True
    }


def _fetch_artist_details(artist_id: str, db: Session) -> dict:
    artist = db.query(Artist).filter_by(id=artist_id).first()
    return {
        "id": artist.id,
        "name": artist.name,
        "imageUrl": artist.image_url,
        "profileUrl": artist.profile_url,
        "isUser": False
    }
