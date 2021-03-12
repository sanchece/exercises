from flask import Flask, render_template, redirect, request, flash
from surveys import satisfaction_survey
app= Flask(__name__)
app.config['SECRET_KEY']="carlos"


RESPONSES=[]

@app.route('/start')
def start():
    return render_template("start.html")

@app.route('/questions/<int:q>')
def show_questions(q):
    if q!=len(RESPONSES):
        flash("stop tinkering with URL")
        return redirect(f'/questions/{len(RESPONSES)}')
    elif len(RESPONSES)==len(satisfaction_survey.questions):
        return redirect('/thanks')

    question= satisfaction_survey.questions[q]
    return render_template("question.html", question=question)

@app.route('/thanks')
def thank():
    return render_template("thanks.html")

@app.route('/answer')
def handle_answer():    
    answer= request.args['answer']
    RESPONSES.append(answer) 

    if len(RESPONSES)>=len(satisfaction_survey.questions):
        RESPONSES.clear()
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{len(RESPONSES)}")
