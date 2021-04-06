from models import User,Post, db, Tag, PostTag
from app import app

db.drop_all()
db.create_all()

dolin= User(first_name="dolin",last_name="days",image_url="https://images.unsplash.com/photo-1617167152074-821b4f8af3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80")
carlos= User(first_name="carlos",last_name="cheese",image_url="https://images.unsplash.com/photo-1617167152074-821b4f8af3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80")
adrian= User(first_name="adrian",last_name="able",image_url="https://images.unsplash.com/photo-1617167152074-821b4f8af3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80")
tammi= User(first_name="tammi",last_name="cervesa",image_url="https://images.unsplash.com/photo-1617167152074-821b4f8af3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80")
db.session.add_all([dolin,carlos,adrian,tammi])
db.session.commit()

post4=Post(title="from tammi",content='nothing',user_id='4',tags=[Tag(name="happy")])
tag2=Tag(name="sad")
tag3=Tag(name="mean")

db.session.add_all([post4,tag2,tag3])
db.session.commit()


post43=Post(title="from tammi",content='nothing',user_id='4',tags=[tag2])


db.session.add(post43)
db.session.commit()

# tag1=Tag(name="happy", posts=post4.id)

# db.session.add(tag1)
# db.session.commit()


# happy=Tag(name='happys', posts=PostTag(post_id=post1.id))
# sad=Tag(name='sads')
# grouchy=Tag(namee='grouchy')
# bluh=Tag(namee='bluh'

