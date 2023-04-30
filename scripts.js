const operations = {
    "+": (a,b) => +a + +b,
    "-": (a,b) => +a - +b,
    "x": (a,b) => +a * +b,
    "÷": (a,b) => +a / +b,
    "^": (a,b) => a ** b,
    "√": (a) => Math.sqrt(a),
    "%": (a) => a/100,
};


function updateNumber (number) {
    const lengthNumber = currentNumber.length;
    if (lengthNumber < 16 && currentNumber !== 0) {
        currentNumber += number;
        updateDisplay(currentNumber);
        return;
    } else if (currentNumber == 0) {
        currentNumber = ""
        currentNumber += number;
        updateDisplay(currentNumber);
        return;
    }
}

function setKeyboardOperator (operator) {
    
    if (operator === "+") return "+"
    if (operator === "-") return "-"
    if (operator === "*") return "x"
    if (operator === "/") return "÷"
    if (operator === "^") return "^"
    
} 

function operate (operator) {
    
    if (currentNumber === "" && prevNumber === "") {
        return;
    } else if (currentNumber !== "" && prevNumber === "") {
        prevNumber = currentNumber;
        currentNumber = "";
        currentOperator = operator;
        updateSubDisplay();
        return;
    } else if (currentNumber === "" && prevNumber !== "") {
        currentOperator = operator;
        updateSubDisplay();
        return;
    } else if (currentNumber !== "" && prevNumber !== "") {
        prevNumber = operations[currentOperator](prevNumber, currentNumber);
        currentOperator = operator;
        currentNumber = "";
        updateSubDisplay();
        updateDisplay(prevNumber);
        return;
    } 

}
    

function updateDisplay (number) {
    display.textContent = number;
}

function updateSubDisplay () {
   subdisplay.textContent = `${prevNumber} ${currentOperator}`;
}
    
function manageSquareRoot() {

    if (currentNumber === "" && prevNumber === "") {
        return;
    } else if (currentNumber !== "") {
        currentOperator = "√";
        subdisplay.textContent = `\u221A(${currentNumber})`;
        prevNumber = operations[currentOperator](currentNumber);
        updateDisplay(prevNumber);
        currentNumber = "";
        return;
    
    } else if (currentNumber === "") {
        currentOperator = "√";
        subdisplay.textContent = `\u221A(${prevNumber})`;
        currentNumber = operations[currentOperator](prevNumber);
        updateDisplay(currentNumber);
        prevNumber = "";
        return;
    }
}


function managePercentage () {

    if (currentNumber === "" && prevNumber === "") {
        return;
    } else if (currentNumber !== "") {
        currentOperator = "%"
        subdisplay.textContent = `${currentNumber}%`;
        prevNumber = operations[currentOperator](currentNumber);
        updateDisplay(prevNumber);
        currentNumber = "";
        return;
        
    } else if (currentNumber === "") {
        currentOperator = "%"
        subdisplay.textContent = `${prevNumber}%`;
        currentNumber = operations[currentOperator](prevNumber);
        updateDisplay(currentNumber);
        prevNumber = "";
        return;
    } 
        
}
     

function manageDel () {
    
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay(currentNumber);

}
function manageClear() {
    currentNumber = "";
    prevNumber = "";
    currentOperator = "";
    updateDisplay("");
    subdisplay.textContent = "";
}

function manageClearEntry () {
    currentNumber = "";
    updateDisplay("");
}

    
function manageEqual () {
    if (currentOperator === "" || currentNumber === "" || prevNumber === "") {
        return;
    } else if (currentNumber == 0 && currentOperator === "÷") {
        updateDisplay("CANNOT DIVIDE BY ZERO");
        currentNumber = "";
        return;
    } 
    subdisplay.textContent = `${prevNumber} ${currentOperator} ${currentNumber} =`;
    currentNumber = operations[currentOperator](prevNumber, currentNumber);
    updateDisplay(currentNumber);
    prevNumber = "";
   
}

function addDot() {
    if (currentNumber.includes(".")) {
        return;
    } else {
        currentNumber += ".";
        updateDisplay(currentNumber);
    }
}

function manageDivideOne () {
    if (currentNumber === "" && prevNumber === "") {
        return;
    } else if (currentNumber !== "") {
        currentOperator = "÷"
        subdisplay.textContent = `1/(${currentNumber})`;
        if (currentNumber == 0) {
            updateDisplay("CANNOT DIVIDE BY ZERO");
            currentNumber = "";
            return;
        }
        prevNumber = operations[currentOperator](1,currentNumber);
        updateDisplay(prevNumber);
        currentNumber = "";
        return;
        
    } else if (currentNumber === "") {
        currentOperator = "÷"
        subdisplay.textContent = `1/(${prevNumber})`;
        if(prevNumber == 0) {
            updateDisplay("CANNOT DIVIDE BY ZERO");
            prevNumber = "";
            return;
        }
        currentNumber = operations[currentOperator](1,prevNumber);
        updateDisplay(currentNumber);
        prevNumber = "";
        return;
    } 
        
}

    
function invertSign() {
    if (currentNumber === ""){
        return;
    }
    currentNumber = currentNumber * -1;
    updateDisplay(currentNumber);
}

function handleKeyboard(e) {
    const key = e.key;
    console.log(key);
    if (key >= 0 && key <= 9) {
        updateNumber(key);
    } else if (["-", "+", "*", "/", "^"].includes(key)) {
        operate(setKeyboardOperator(key));
    } else if (key === "Enter" || key === "=") {
        manageEqual();
    } else if (key === "Backspace") {  
        manageDel();
    } else if (key === ".") {
        addDot();
    } 
}

    

        
let prevNumber = "";
let currentNumber = "";
let currentOperator = "";

const equal = document.querySelector(".equal");
const squareRoot = document.querySelector(".square-root");
const percentage = document.querySelector(".percentage");
const divideOne = document.querySelector(".divide-one");
const changeSign = document.querySelector(".change-sign");
const dot = document.querySelector(".dot");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const clearEntry = document.querySelector(".clear-entry");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const display = document.querySelector(".display");
const subdisplay = document.querySelector(".subdisplay");

document.addEventListener("keydown", handleKeyboard)

numbers.forEach(number => number.addEventListener("click", () => updateNumber(number.textContent)));
operators.forEach(operator => operator.addEventListener("click",() => operate(operator.textContent)));
equal.addEventListener("click", manageEqual);
squareRoot.addEventListener("click", manageSquareRoot);
percentage.addEventListener("click", managePercentage);
changeSign.addEventListener("click", invertSign);
divideOne.addEventListener("click", manageDivideOne);
del.addEventListener("click", manageDel);
clear.addEventListener("click", manageClear);
clearEntry.addEventListener("click", manageClearEntry);
dot.addEventListener("click", addDot);













