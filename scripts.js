    const operations = {
        "+": (a,b) => +a + +b,
        "-": (a,b) => +a - +b,
        "x": (a,b) => +a * +b,
        "/": (a,b) => +a/+b,
        "^": (a,b) => a ** b,
    };

// Check if the number displayed is less than 16 digits
function checkNumberLength () {
    const lengthNumber = currentNumber.length;
    if (lengthNumber < 16) {
        currentNumber += this.textContent;
        updateDisplay(currentNumber);
    }
}

function updateOperator (oper) {
    let operator = oper.classList;

    if (operator.contains("add")) {
        currentOperator = "+";
    } else if (operator.contains("substract")) {
        currentOperator = "-";
    } else if (operator.contains("multiply")) {
        currentOperator = "x";
    } else if (operator.contains("divide")) {
        currentOperator = "/";
    } else if (operator.contains("square-root")) {
        currentOperator = "";
    } else if (operator.contains("power")) {
        currentOperator = "^";
    }

}

// Update the current number displayed, if an operator is pressed
function updateCurrentNumber () {
    let temp = "";
    if (prevNumber.length == 0) {
        prevNumber = currentNumber;
    } else {
        temp = prevNumber;
        prevNumber = operations[currentOperator](temp, currentNumber);  
    }
    updateOperator(this);
    updateDisplay(prevNumber);
    updateSubDisplay();
    currentNumber = "";
}
    

function updateDisplay (number) {
    display.textContent = number;
}

function updateSubDisplay () {
    subdisplay.textContent = `${prevNumber} ${currentOperator}`;
    
}

function manageEqual () {
    subdisplay.textContent = `${prevNumber} ${currentOperator} ${currentNumber} =`;
}
        
   
    
let prevNumber = "";
let currentNumber = "";
let currentOperator = "";
const equal = document.querySelector(".equal");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const display = document.querySelector(".display");
const subdisplay = document.querySelector(".subdisplay");
numbers.forEach(number => number.addEventListener("click", checkNumberLength));
operators.forEach(operator => operator.addEventListener("click",updateCurrentNumber));
equal.addEventListener("click", manageEqual);












