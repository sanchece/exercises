from flask import Flask, render_template, redirect, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet

from forms import AddPetForm,EditPetForm
app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']=False

app.config['SECRET_KEY'] = "SECRET!"

debug = DebugToolbarExtension(app)

connect_db(app)

# db.drop_all()
# db.create_all()

@app.route('/')
def homepage():
    pets=Pet.query.all()
    return render_template('home.html', pets=pets)

@app.route('/add', methods=["GET","POST"])
def add_pet():
    form=AddPetForm()
    if form.validate_on_submit():
        pet= form.name.data
        species=form.species.data
        photo=form.photo.data
        age=form.age.data
        notes=form.notes.data

        new_pet=Pet(name=pet,species=species,photo_url=photo,age=age,notes=notes)
        db.session.add(new_pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add_pet_form.html', form=form)

@app.route('/<int:pet_id>', methods=["GET","POST"])
def pet_details(pet_id):
    pet=Pet.query.get_or_404(pet_id)
    form=EditPetForm(obj=pet)

    if form.validate_on_submit():
        new_photo=form.photo.data
        new_notes=form.notes.data
        available=form.available.data

        pet.photo_url=new_photo
        pet.notes=new_notes
        pet.available=available
        db.session.commit()

        return redirect('/')

    return render_template("pet_details.html",form=form,pet=pet)
