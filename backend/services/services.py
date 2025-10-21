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


def add_graph_to_db(user_id: str, user_name: str, artists: list[dict], db: Session) -> Graph | None:
    try:
        user = db.query(User).filter_by(id=user_id).first()
        if not user:
            user = add_user_to_db(user_id, user_name, db)

        for artist in artists:
            artist_obj = Artist(
                id=artist.get("id"),
                name=artist.get("name"),
                image_url=artist.get("imageUrl"),
                profile_url=artist.get("profileUrl")
            )

            artist_user_assoc = UserArtistAssociation(
                user_id=user.id,
                artist_id=artist_obj.id
            )

            db.add(artist_obj)
            db.add(artist_user_assoc)
        graph = Graph(
            user_1_id=user.id
        )
        db.add(graph)
        db.commit()

        return graph
    except Exception as e:
        db.rollback()
        return None # TODO: handle error properly
