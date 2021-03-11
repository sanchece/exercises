# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div
 # from operations import add, sub, mult, div
app=Flask(__name__)


@app.route('/add')
def handle_add():
    a=int(request.args['a'])
    b=int(request.args['b'])
    total=add(a,b)
    return str(total)

@app.route('/sub')
def handle_sub():
    a=int(request.args['a'])
    b=int(request.args['b'])
    total=sub(a,b)
    return str(total)

@app.route('/div')
def handle_div():
    a=int(request.args['a'])
    b=int(request.args['b'])
    total=div(a,b)
    return str(total)
@app.route('/mult')
def handle_mult():
    a=int(request.args['a'])
    b=int(request.args['b'])
    total=mult(a,b)
    return str(total)



operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<oper>")
def do_math(oper):
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = operators[oper](a, b)
    return str(result)