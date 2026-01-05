from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.json
    a = float(data["a"])
    b = float(data["b"])
    op = data["op"]

    if op == "+":
        result = a + b
    elif op == "-":
        result = a - b
    elif op == "*":
        result = a * b
    elif op == "/":
        result = "Error" if b == 0 else a / b

    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
