const operations = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "x": (a,b) => a * b,
    "/": (a,b) => a/b,
    "^": (a,b) => a ** b,
};

function checkNumberLength () {
    const lengthNumber = numberDisplayed.length;
    if (lengthNumber < 16) {
        numberDisplayed += this.textContent;
    }
}

function updateStack () {
    stack.push(numberDisplayed);
    numberDisplayed = "";
    currentOperator = this.textContent;
}
    



let numberDisplayed = "";
let stack = [];
let currentOperator = ""
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
numbers.forEach(number => number.addEventListener("click", checkNumberLength));
operators.forEach(operator => operator.addEventListener("click", updateStack));











