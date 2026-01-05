let a = "";
let b = "";
let op = "";

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

function append(value) {
    if (op === "") {
        a += value;
        display.value = a;
        historyDisplay.innerText = a;
    } else {
        b += value;
        display.value = b;
        historyDisplay.innerText = `${a} ${op} ${b}`;
    }
}

function setOp(operator) {
    if (a !== "") {
        op = operator;
        historyDisplay.innerText = `${a} ${op}`;
    }
}

function clearDisplay() {
    a = "";
    b = "";
    op = "";
    display.value = "0";
    historyDisplay.innerText = "0";
}

function calculate() {
    if (a === "" || b === "" || op === "") return;

    let backendOp = op === "×" ? "*" : op === "÷" ? "/" : op;

    fetch("/calculate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ a, b, op: backendOp })
    })
    .then(res => res.json())
    .then(data => {
        display.value = data.result;
        historyDisplay.innerText = `${a} ${op} ${b} =`;
        a = data.result.toString();
        b = "";
        op = "";
    });
}
