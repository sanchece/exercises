from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()
def connect_db(app):
    db.app=app
    db.init_app(app)
    

class User(db.Model):

    __tablename__="users"

    id=db.Column(db.Integer,primary_key=True)
    first_name=db.Column(db.String(20), nullable= False)
    last_name=db.Column(db.String(20), nullable=False)
    image_url=db.Column(db.String, nullable=True)

    post=db.relationship('Post',backref='user')

class Post(db.Model):
    __tablename__="posts"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(20), nullable=False)
    content=db.Column(db.String,nullable=False)
    created_at=db.Column(db.DateTime)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
