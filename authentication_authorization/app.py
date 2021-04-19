from flask import Flask, render_template, redirect, flash,session
from flask_debugtoolbar import DebugToolbarExtension
from models import db,connect_db,User,Feedback
from forms import User_Form, Login_Form, Add_Feedback

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///auth"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['SECRET_KEY'] = "SECRET!"

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
toolbar = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    return redirect('/register')

@app.route('/register',methods=["GET","POST"])
def register():
    form=User_Form()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data
        email=form.email.data
        firstname=form.first_name.data
        lastname=form.last_name.data
        new_user=User.register(username,password,email,firstname,lastname)
        db.session.add(new_user)
        db.session.commit()

        session['user_id']=new_user.id
        return redirect(f'/users/{username}')
    return render_template("register.html", form=form)

@app.route('/users/<username>')
def users(username):
    if "user_id" not in session:
        return "login to view this page"
    user=User.query.filter_by(username=username).first()
    return render_template("users.html",user=user)

@app.route('/login',methods=["GET","POST"])
def login():
    login_form=Login_Form()
    if login_form.validate_on_submit():
        username=login_form.username.data
        password=login_form.password.data
        user=User.authenticate(username,password)

        session['user_id']=user.id
        if user:
            return redirect(f"/users/{username}")      
    return render_template("login.html",login_form=login_form)

@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/')
    
@app.route('/users/<username>/delete',methods=["POST"])
def delete_user(username):
    user_to_delete=User.query.filter_by(username=username).first()
    db.session.delete(user_to_delete)
    db.session.commit()
    return f"Account has been deleted"

@app.route('/users/<username>/feedback/add', methods=["GET","POST"])
def add_feedback(username):
    feedback_form=Add_Feedback()
    user=User.query.filter_by(username=username).first()
    if feedback_form.validate_on_submit() and session['user_id']==user.id:
        title=feedback_form.title.data
        content=feedback_form.content.data
        user_id=user.id

        new_feedback=Feedback(title=title, content=content, user_id=user_id)
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f'/users/{username}')
    elif session['user_id']==user.id:
        return render_template("add_feedback.html",feedback_form=feedback_form)
    else:
        return "You cannot add feedback for this account"

@app.route('/feedback/<feedback_id>/update', methods=["GET","POST"])
def update_feedback(feedback_id):
    current_feedback=Feedback.query.get_or_404(feedback_id)
    feedback_form=Add_Feedback()
    if feedback_form.validate_on_submit() and session['user_id']==current_feedback.user_id:
        title=feedback_form.title.data
        content=feedback_form.content.data
        user_id=current_feedback.user_id

        current_feedback.title=title
        current_feedback.content=content
        current_feedback.user_id=user_id
        db.session.commit()
        return redirect(f'/users/{User.query.get_or_404(current_feedback.user_id).username}')
    if session['user_id']==current_feedback.user_id:        
        feedback_form=Add_Feedback(obj=current_feedback)
        return render_template('update_feedback.html',feedback_form=feedback_form)
    else:
        return "you cannot update feedback for this account"

@app.route('/feedback/<feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if session['user_id']==feedback.user_id:        
        db.session.delete(feedback)
        db.session.commit()
        return redirect(f'/users/{User.query.get_or_404(feedback.user_id).username}')

    else:
        return "you cannot delete this feedback"




