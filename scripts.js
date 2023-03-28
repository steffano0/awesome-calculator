const operations = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "x": (a,b) => a * b,
    "/": (a,b) => a/b,
    "^": (a,b) => a ** b,
};

function checkNumberLength () {
    const lengthNumber = textDisplayed.length;
    if (lengthNumber < 16) {
        textDisplayed += this.textContent;
    }
}
    



let textDisplayed = "";
const numbers = Array.from(document.querySelectorAll(".number"));
numbers.forEach(number => number.addEventListener("click", checkNumberLength));











