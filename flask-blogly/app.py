from flask import Flask, render_template, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db,User,Post, Tag, PostTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False

app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

connect_db(app)

# db.drop_all()
# db.create_all()

@app.route('/')
def list_stories():
    posts=Post.query.all()
    return render_template("posts.html",posts=posts)

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
    
@app.route('/users/<int:user_id>/posts/new', methods=["GET"])
def add_post_form(user_id):
    user=User.query.get_or_404(user_id)
    tags=Tag.query.all()
    return render_template("add_post.html",user=user,tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
  
    title=request.form["title"]
    content=request.form["content"]
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    new_post=Post(title=title,content=content,user_id=user_id,tags=tags)
    db.session.add(new_post)
    db.session.commit()

    return redirect(f"/posts/{new_post.id}")

@app.route('/posts/<int:post_id>')
def post(post_id):
    post=Post.query.get_or_404(post_id)
    return render_template("post_details.html", post=post)
  
@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def post_delete(post_id):
    post=Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect("/users")

@app.route('/posts/<int:post_id>/edit')
def post_edit_form(post_id):
    post=Post.query.get_or_404(post_id)
    tags=Tag.query.all()
    return render_template("edit_post.html",post=post,tags=tags)

@app.route('/posts/<int:post_id>/edit',methods=["POST"])
def post_edit(post_id):
    post=Post.query.get_or_404(post_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    new_tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    new_title=request.form["title"]
    new_content=request.form["content"]

    post.title=new_title
    post.content=new_content
    post.tags=new_tags
    db.session.add(post)
    db.session.commit()
    return redirect("/users")

@app.route('/tags')
def tags():
    tags=Tag.query.all()
    return render_template('tags.html',tags=tags)

@app.route('/tags/<int:tag_id>')
def tag_details(tag_id):
    tag=Tag.query.get_or_404(tag_id)
    return render_template('tag_details.html',tag=tag)

@app.route('/tags/new')
def add_tag_form():
    return render_template('add_tag.html')

@app.route('/tags/new',methods=["POST"])
def add_tag():
    tag_name=request.form["tag-name"]
    tag=Tag(name=tag_name)
    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag_form(tag_id):
    tag=Tag.query.get_or_404(tag_id)
    return render_template('edit_tag.html',tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    tag_new_name=request.form["new-tag-name"]
    tag=Tag.query.get_or_404(tag_id)
    tag.name=tag_new_name
    
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    tag=Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')

