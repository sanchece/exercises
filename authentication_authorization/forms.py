from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length

class User_Form(FlaskForm):
    username = StringField("Username", validators=[InputRequired(),Length(max=20)])
    password = PasswordField("Password", validators=[InputRequired()])

    email = StringField(
        "Email",
        validators=[InputRequired(), Length(max=50)],
    )   
    first_name=StringField("First Name",validators=[InputRequired(), Length(max=20)])
    last_name=StringField("Last Name", validators=[InputRequired(),Length(max=20)])

class Login_Form(FlaskForm):
    username = StringField("Username", validators=[InputRequired(),Length(max=20)])
    password = PasswordField("Password", validators=[InputRequired()])


class Add_Feedback(FlaskForm):
    title=StringField("Title",validators=[InputRequired(),Length(max=100)])
    content=StringField("Content",validators=[InputRequired()])
