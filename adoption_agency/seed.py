from models import Pet, db
from app import app

db.drop_all()
db.create_all()

pet1= Pet(name="minino",species="cat",photo_url="https://bloximages.newyork1.vip.townnews.com/roanoke.com/content/tncms/assets/v3/editorial/4/d4/4d4438ec-0958-56b9-8832-ac1486cda4f8/5bd738d346d4f.image.jpg?resize=1200%2C960")
pet2= Pet(name="toto",species="dog",photo_url="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/40/1507297818-bolognese-dog.jpg?crop=1.0xw:1xh;center,top&resize=480:*")
pet3= Pet(name="charro",species="dog",photo_url="https://www.ccspca.com/wp-content/uploads/2019/05/East-A4107562.png")

db.session.add_all([pet1,pet2,pet3])
db.session.commit()
