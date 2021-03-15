from flask import Flask, render_template, redirect, request, flash, session
from surveys import satisfaction_survey
app= Flask(__name__)
app.config['SECRET_KEY']="carlos"

@app.route('/start')
def start():
    return render_template("start.html", survey=satisfaction_survey)

@app.route('/sesh', methods=["POST"])
def set_session():
    session["RESPONSES"]=[]
    return redirect("/questions/0")


@app.route('/questions/<int:q>')
def show_questions(q):
    RESPONSES=session['RESPONSES']

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
    RESPONSES=session['RESPONSES']
    RESPONSES.append(answer) 
    session['RESPONSES']=RESPONSES

    if len(RESPONSES)>=len(satisfaction_survey.questions):
        return redirect("/thanks")
    else:
        return redirect(f"/questions/{len(RESPONSES)}")
