from models import User, Feedback, db, bcrypt
from app import app

db.drop_all()
db.create_all()

def make_password(password):
        hashed=bcrypt.generate_password_hash(password)
        hashed_utf8=hashed.decode("utf8")
        return hashed_utf8

user1=User(username="doozes", password=f"{make_password('dolin')}",email="dolin@diaz.com",first_name="dolin", last_name="days")
user2=User(username="tams", password=f"{make_password('tammi')}",email="tammi@cervea.com",first_name="tammi", last_name="cerveza")
feedback1=Feedback(title="rant",content="jerbear",user_id=2)
db.session.add_all([user1,user2,feedback1])
db.session.commit()

