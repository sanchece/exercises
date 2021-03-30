from flask import Flask, render_template, redirect, request
from models import db, connect_db, User


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)

# db.create_all()



@app.route('/users')
def list():
    users=User.query.all()
    return render_template("index.html",users=users)

@app.route('/users/new')
def add_user_form():
    return render_template("add_user.html")

@app.route('/users/new',methods=["POST"])
def add_user():
    first_name=request.form["first-name"]
    last_name=request.form["last-name"]
    image_url=request.form["image-url"]
    
    new_user=User(first_name=first_name,last_name=last_name,image_url=image_url)
    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")


@app.route('/users/<int:user_id>')
def show_user(user_id):
    user=User.query.get_or_404(user_id)
    return render_template("user_details.html",user=user)



@app.route('/users/<int:user_id>/edit', methods=["GET"])
def edit_user_form(user_id):
    user=User.query.get_or_404(user_id)
    return render_template("edit_user.html",user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    new_first_name=request.form["first-name"]
    new_last_name=request.form["last-name"]
    new_image_url=request.form["image-url"]
    
    user=User.query.get_or_404(user_id)
    user.first_name=new_first_name
    user.last_name=new_last_name
    user.image_url=new_image_url
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    user=User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/users")
    


