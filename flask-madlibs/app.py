from flask import Flask, render_template, request
from stories import story
app=Flask(__name__)


@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/make-story")
def make_story():
    return frender_template("make-story.html")


@app.route("/casa")
def casa():
    categories= story.prompts
    return render_template("casa.html", categories=categories)
@app.route('/madlib')
def madlib():
    this_story=story.generate(request.args)
    return render_template("madlib.html", story=this_story)