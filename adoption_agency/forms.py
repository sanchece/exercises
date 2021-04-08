from flask_wtf import FlaskForm
from wtforms import StringField, FloatField,BooleanField
from wtforms.validators import InputRequired, Optional, AnyOf,URL,NumberRange
class AddPetForm(FlaskForm):
    """Form for adding pets"""
    name=StringField("Name:", validators=[InputRequired()],render_kw={"placeholder":"Enter pet name"} )
    species=StringField("Species:", validators=[InputRequired()], render_kw={"placeholder":"Enter species"})
    photo=StringField("Photo:", validators=[Optional(),URL(require_tld=True)],render_kw={"placeholder":"Enter photo"} )
    age=FloatField("Age:", validators=[Optional(),NumberRange(min=0,max=30)], render_kw={"placeholder":"Enter Age"})
    notes=StringField("Additional Notes:", validators=[Optional()],render_kw={"placeholder":"Any additional notes?"} )

class EditPetForm(FlaskForm):
    """Form to edit pet data"""
    photo=StringField("Photo:", validators=[Optional(),URL(require_tld=True)],render_kw={"placeholder":"Change photo"} )
    notes=StringField("Additional Notes:", validators=[Optional()],render_kw={"placeholder":"Any additional notes?"} )
    available=BooleanField("Availability:",render_kw={"placeholder":"Availability?"})
