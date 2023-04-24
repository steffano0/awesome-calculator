    const operations = {
        "+": (a,b) => +a + +b,
        "-": (a,b) => +a - +b,
        "x": (a,b) => +a * +b,
        "/": (a,b) => +a / +b,
        "^": (a,b) => a ** b,
        "√": (a) => Math.sqrt(a),
        "%": (a) => a/100,
    };

// Check if the number displayed is less than 16 digits
function checkNumberLength () {
    const lengthNumber = currentNumber.length;
    if (lengthNumber < 16 && currentNumber != "0") {
        currentNumber += this.textContent;
        updateDisplay(currentNumber);
    } else if (currentNumber == "0") {
        currentNumber = ""
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
    } else if (operator.contains("power")) {
        currentOperator = "^";
    }

}


function updateCurrentNumber () {
    let temp = "";
    if (prevNumber == 0 && currentNumber != "") {
        prevNumber = currentNumber;
        updateOperator(this);
        updateDisplay(prevNumber);
        updateSubDisplay();
    }  else if (currentNumber != "") { 
        if (currentNumber == "0" && currentOperator == "/") {
            updateDisplay("CANNOT DIVIDE BY ZERO");
            return;
        } 
            
        temp = prevNumber;
        prevNumber = operations[currentOperator](temp, currentNumber);
        updateOperator(this);
        updateDisplay(prevNumber);
        
    } else if (currentNumber == "") {
        updateOperator(this);
        updateSubDisplay(); 
    }
    currentNumber = ""; 
    
}
    

function updateDisplay (number) {
    display.textContent = number;
}

function updateSubDisplay () {
   subdisplay.textContent = `${prevNumber} ${currentOperator}`;
}
    
function manageSquareRoot() {
    currentOperator = "√";
    if (currentNumber == "") {
        subdisplay.textContent = `\u221A(${prevNumber})`;
        currentNumber = operations[currentOperator](prevNumber);
    } else {
        subdisplay.textContent = `\u221A(${currentNumber})`;
        currentNumber = operations[currentOperator](currentNumber);
    }
    updateDisplay(currentNumber);

}

function managePercentage () {
    currentOperator = "%";
    if (currentNumber == "") {
        subdisplay.textContent = `${prevNumber}%`;
        currentNumber = operations[currentOperator](prevNumber);
    } else {
        subdisplay.textContent = `${currentNumber}%`;
        currentNumber = operations[currentOperator](currentNumber);
    
    }
    updateDisplay(currentNumber);
}

function manageDel () {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);

}
function manageClear() {
    currentNumber = "0";
    prevNumber = "";
    currentOperator = "";
    updateDisplay(currentNumber);
    updateSubDisplay();
}

function manageClearEntry () {
    currentNumber = "0";
    updateDisplay(currentNumber);
}

    
function manageEqual () {
    if (currentOperator == "" || currentNumber == "" || prevNumber == "") {
        return;
    } else if (currentNumber == 0 && currentOperator == "/") {
        updateDisplay("CANNOT DIVIDE BY ZERO");
        return;
    } 
    subdisplay.textContent = `${prevNumber} ${currentOperator} ${currentNumber} =`;
    currentNumber = operations[currentOperator](prevNumber, currentNumber);
    updateDisplay(currentNumber);
    prevNumber = "";
   
}

function manageDivideOne () {
    currentOperator = "/"
    if (currentNumber == 0) {
        updateDisplay("CANNOT DIVIDE BY ZERO");
        return;
    }
    subdisplay.textContent = `1/(${currentNumber})`;
    currentNumber = operations[currentOperator](1, currentNumber);
    updateDisplay(currentNumber);
    
    
}
        
   
    
let prevNumber = 0;
let currentNumber = 0;
let currentOperator = "";
const equal = document.querySelector(".equal");
const squareRoot = document.querySelector(".square-root");
const percentage = document.querySelector(".percentage");
const divideOne = document.querySelector(".divide-one");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const clearEntry = document.querySelector(".clear-entry");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const display = document.querySelector(".display");
const subdisplay = document.querySelector(".subdisplay");
numbers.forEach(number => number.addEventListener("click", checkNumberLength));
operators.forEach(operator => operator.addEventListener("click",updateCurrentNumber));
equal.addEventListener("click", manageEqual);
squareRoot.addEventListener("click", manageSquareRoot);
percentage.addEventListener("click", managePercentage);
divideOne.addEventListener("click", manageDivideOne);
del.addEventListener("click", manageDel);
clear.addEventListener("click", manageClear);
clearEntry.addEventListener("click", manageClearEntry);













