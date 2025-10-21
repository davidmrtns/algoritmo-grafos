import uuid
from sqlalchemy import UUID, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db.connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)

    artists = relationship("UserArtistAssociation", back_populates="user")


class Artist(Base):
    __tablename__ = "artists"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    profile_url = Column(String, nullable=False)

    users = relationship("UserArtistAssociation", back_populates="artist")


class UserArtistAssociation(Base):
    __tablename__ = "user_artist_associations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    artist_id = Column(String, ForeignKey("artists.id"))

    user = relationship("User", back_populates="artists")
    artist = relationship("Artist", back_populates="users")


class Graph(Base):
    __tablename__ = "graphs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_1_id = Column(String, ForeignKey("users.id"), nullable=False)
    user_2_id = Column(String, ForeignKey("users.id"), nullable=True)

    user_1 = relationship("User", foreign_keys=[user_1_id])
    user_2 = relationship("User", foreign_keys=[user_2_id])
