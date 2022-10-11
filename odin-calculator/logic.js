const container = document.getElementById("container");
const paraDisplayOutput = document.getElementById('output-display'); 
const buttonsNumber = document.getElementsByClassName('number-buttons');
const buttonClear = document.getElementById('controls-clear');
const buttonPercentage = document.getElementById('controls-percentage');
const buttonAdittionMinus = document.getElementById('controls-adittion-minus');
const allButtons = document.getElementsByTagName('button');
const buttonComma = document.getElementById('controls-comma');
const buttonAdittion = document.getElementById('controls-adittion');
const buttonEquals = document.getElementById('controls-equals');
const buttonMultiply = document.getElementById('controls-multiply');
const buttonSubtract = document.getElementById('controls-subtract');
const buttonDivide =  document.getElementById('controls-divide');
const buttonZero = document.getElementById('controls-0');
const stylesheet = document.styleSheets[0];

let currentSum = 0;
let currentInputNum = 0;
let currentButtonNum = "";
paraDisplayOutput.textContent = currentInputNum;

window.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "Backspace") {
        if(currentInputNum === 0) { } else {
            paraDisplayOutput.textContent = paraDisplayOutput.textContent.slice(0, -1);
            if(paraDisplayOutput.textContent == "") { 
                paraDisplayOutput.textContent = 0;
                currentInputNum = 0;
            };
        };
    };
});

function adittionMinusClicked() {
    if(lastSelectedEquals) {
        currentSum = -currentSum;
        paraDisplayOutput.textContent = currentSum;
    } else {
        currentInputNum = -currentInputNum;
        paraDisplayOutput.textContent = currentInputNum;
    };
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonAdittionMinus.addEventListener("click", function() {
    adittionMinusClicked();
});

function percentageButtonClicked() {
    if(lastSelectedEquals) {
        currentSum = currentSum / 100;
        paraDisplayOutput.textContent = currentSum;
    } else {
        currentInputNum = currentInputNum / 100;
        paraDisplayOutput.textContent = currentInputNum;
    };
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonPercentage.addEventListener("click", function() {
    percentageButtonClicked();
});

function clearButtonClicked() {
    clearBorderOperatorButtons();
    displayParaRule.style.fontSize = "3em";
    lastSelectedEquals = false;
    lastSelectedOperator = false;
    currentOperator = "";
    newInputNum = "";
    currentInputNum = 0;
    currentSum = 0;
    paraDisplayOutput.textContent = currentInputNum;
}

buttonClear.addEventListener("click", function() {
    clearButtonClicked();
});

function switchButtonColorDown(button) {
    let buttonRule = [...stylesheet.cssRules].find((r) => r.selectorText === `#${button.id}`);
    switch(button.className) {
        case 'control-buttons':
            buttonRule.style.backgroundColor = 'rgb(123, 123, 123)';
            break;
        case 'number-buttons':
            buttonRule.style.backgroundColor = 'rgb(176, 176, 176)';
            break;
        case 'comma-button':
            buttonRule.style.backgroundColor = 'rgb(176, 176, 176)';
            break;
        case 'zero-button':
            buttonRule.style.backgroundColor = 'rgb(176, 176, 176)';
            break;
        case 'operator-buttons':
            buttonRule.style.backgroundColor = 'rgb(192, 129, 45)';
            break;
        case 'equals-button':
            buttonRule.style.backgroundColor = 'rgb(192, 129, 45)';
    };
};

function switchButtonColorUp(button) {
    let buttonRule = [...stylesheet.cssRules].find((r) => r.selectorText === `#${button.id}`);
    switch(button.className) {
        case 'control-buttons':
            buttonRule.style.backgroundColor = 'rgb(97, 97, 97)';
            break;
        case 'number-buttons':
            buttonRule.style.backgroundColor = 'rgb(123, 123, 123)';
            break;
        case 'comma-button':
            buttonRule.style.backgroundColor = 'rgb(123, 123, 123)';
            break;
        case 'zero-button':
            buttonRule.style.backgroundColor = 'rgb(123, 123, 123)';
            break;
        case 'operator-buttons':
            buttonRule.style.backgroundColor = 'rgb(255, 158, 11)';
            break;
        case 'equals-button':
            buttonRule.style.backgroundColor = 'rgb(255, 158, 11)';
    };
};

const buttonsToKeysMap = [
    { key: "0", className: "zero-button", id: "controls-0" },
    { key: "1", className: "number-buttons", id: "controls-1" },
    { key: "2", className: "number-buttons", id: "controls-2" },
    { key: "3", className: "number-buttons", id: "controls-3" },
    { key: "4", className: "number-buttons", id: "controls-4" },
    { key: "5", className: "number-buttons", id: "controls-5" },
    { key: "6", className: "number-buttons", id: "controls-6" },
    { key: "7", className: "number-buttons", id: "controls-7" },
    { key: "8", className: "number-buttons", id: "controls-8" },
    { key: "9", className: "number-buttons", id: "controls-9" },
    { key: ".", className: "comma-button", id: "controls-comma" },
    { key: "=", className: "equals-button", id: "controls-equals" },
    { key: "+", className: "operator-buttons", id: "controls-adittion" },
    { key: "%", className: "control-buttons", id: "controls-percentage" },
    { key: "±", className: "control-buttons", id: "controls-adittion-minus" },
    { key: "c", className: "control-buttons", id: "controls-clear" },
    { key: "/", className: "operator-buttons", id: "controls-divide" },
    { key: "*", className: "operator-buttons", id: "controls-multiply" },
    { key: "-", className: "operator-buttons", id: "controls-subtract" }
];

Array.from(allButtons).forEach(button => {
    addEventListener('keydown', (event) => { 
        if(buttonsToKeysMap.find(findKey)) {
            if(buttonsToKeysMap.find(findKey).id == button.id) {
                switchButtonColorDown(button);
                if(button.className === "number-buttons") {
                    numberButtonClicked(button);
                } else {
                    switch(button.id) {
                        case "controls-clear":
                            clearButtonClicked();
                            break;
                        case "controls-comma":
                            commaButtonClicked();
                            break;
                        case "controls-equals":
                            equalsButtonClicked();
                            break;
                        case "controls-multiply":
                            multiplyButtonClicked();
                            break;
                        case "controls-adittion":
                            adittionButtonClicked();
                            break;
                        case "controls-subtract":
                            subtractButtonClicked();
                            break;
                        case "controls-divide":
                            divideButtonClicked();
                            break;
                        case "controls-0":
                            zeroButtonClicked();
                            break;
                    };
                }
            };
        };
        function findKey(key) {
            return key.key === event.key;
        };
    });
});

Array.from(allButtons).forEach(button => {
    addEventListener('keyup', (event) => { 
        if(buttonsToKeysMap.find(findKey)) {
            if(buttonsToKeysMap.find(findKey).id === button.id) {
                switchButtonColorUp(button);
            };
        };
        function findKey(key) {
            return key.key === event.key;
        };
    });
});

Array.from(allButtons).forEach(button => {
    addListenerMulti(button, "mousedown touchstart", function() {
        switchButtonColorDown(button);
    });
});

Array.from(allButtons).forEach(button => {
    addListenerMulti(button, "mouseup touchend", function() {
        switchButtonColorUp(button);
    });
});

function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i=0, iLen=events.length; i<iLen; i++) {
        element.addEventListener(events[i], listener, false);
    };
};

function commaButtonClicked() {
    innerButtonComma = buttonComma.innerHTML;
    if(!paraDisplayOutput.textContent.includes(".")) {
        paraDisplayOutput.textContent = currentInputNum + innerButtonComma;
    };
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonComma.addEventListener("click", function() {
    commaButtonClicked();
});

function numberButtonClicked(buttonNumber) {
    currentButtonNum = buttonNumber.innerHTML;
    operatorUsed(currentOperator, currentButtonNum);
    if(buttonNumber.innerHTML == 0) {} else {
        if(currentInputNum == 0) { currentInputNum = ""; };
        if(paraDisplayOutput.textContent.includes(".") && currentOperator == "") { 
            if(currentInputNum == 0) { currentInputNum = ""; };
            showCurrentInputWithComma(currentButtonNum); 
        } else {
            if(currentOperator == "") {
                if(currentInputNum == 0) { currentInputNum = ""; };
                showCurrentInputNum(currentButtonNum);
            }
        }
    }
    if(paraDisplayOutput.textContent.length >= 30) {
        paraDisplayOutput.textContent = paraDisplayOutput.textContent.slice(0,30);
    };
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

Array.from(buttonsNumber).forEach(buttonNumber => {
    buttonNumber.addEventListener("click", function() {
        numberButtonClicked(buttonNumber);
    });
});

let lastSelectedOperator;

function operatorUsed(currentOperator, currentButtonNum) {
    if(currentOperator != "") {
        if(paraDisplayOutput.textContent.includes(".")) {
            if(currentInputNum == 0) { currentInputNum = ""; };
            if(lastSelectedOperator) { 
                paraDisplayOutput.textContent = "";
                lastSelectedOperator = false;
            };
            if(lastSelectedEquals) {       
                paraDisplayOutput.textContent = "";
                currentInputNum = "";          
                lastSelectedEquals = false; 
            };
            showCurrentInputWithComma(currentButtonNum);
        } else {
            if(lastSelectedOperator) { 
                paraDisplayOutput.textContent = "";
                lastSelectedOperator = false;
            };
            if(lastSelectedEquals) {       
                paraDisplayOutput.textContent = "";
                currentInputNum = "";          
                lastSelectedEquals = false; 
            };
            if(currentInputNum == 0) { currentInputNum = ""; };
            showCurrentInputNum(currentButtonNum);
        }
        adjustFontSize(displayParaRule, paraDisplayOutput);
    };
};

function showCurrentInputNum(currentButtonNum) {
    currentInputNum += currentButtonNum;
    paraDisplayOutput.textContent = currentInputNum;
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

function showCurrentInputWithComma(currentButtonNum) {
    paraDisplayOutput.textContent += currentButtonNum;
    currentInputNum = paraDisplayOutput.textContent;
    paraDisplayOutput.textContent = currentInputNum;
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

function zeroButtonClicked() {
    currentButtonNum = "0";
    if((lastSelectedOperator && currentSum != 0 && !currentInputNum.toString().slice(0,2) === "0.") || (lastSelectedOperator && currentSum !=0 && currentInputNum == "0")) { paraDisplayOutput.textContent = "0"; };
    if(paraDisplayOutput.textContent.slice(0,2) === "0.") { paraDisplayOutput.textContent += currentButtonNum; };
    if(currentInputNum === 0 && currentSum === 0) { } else {
        if(paraDisplayOutput.textContent.includes(".")) {
            showCurrentInputWithComma(currentButtonNum);
        } else {
            currentInputNum = 0;
            paraDisplayOutput.textContent = currentInputNum;
        };
    }
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonZero.addEventListener("click", function() {
    zeroButtonClicked();
});

let currentOperator = "";
const subtractParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#controls-subtract");
const divideParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#controls-divide");
const multiplyParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#controls-multiply");
const adittionParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#controls-adittion");

function clearBorderOperatorButtons() {
    subtractParaRule.style.borderWidth = "0.001em";
    divideParaRule.style.borderWidth = "0.001em";
    adittionParaRule.style.borderWidth = "0.001em";
    multiplyParaRule.style.borderWidth = "0.001em";
};

function adittionButtonClicked() {
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(currentOperator != "" && currentInputNum != 0) { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    adjustFontSize(displayParaRule, paraDisplayOutput);
    clearBorderOperatorButtons();
    adittionParaRule.style.borderWidth = "0.1em";
    currentOperator = "+";
};

buttonAdittion.addEventListener("click", function() {
    adittionButtonClicked();
});

function divideButtonClicked() {
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(currentOperator != "" && currentInputNum != 0) { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    adjustFontSize(displayParaRule, paraDisplayOutput);
    clearBorderOperatorButtons();
    divideParaRule.style.borderWidth = "0.1em";
    currentOperator = "/";
};

buttonDivide.addEventListener("click", function() {
    divideButtonClicked();
});

function multiplyButtonClicked() {
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(currentOperator != "" && currentInputNum != 0) { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    adjustFontSize(displayParaRule, paraDisplayOutput);
    clearBorderOperatorButtons();
    multiplyParaRule.style.borderWidth = "0.1em";
    currentOperator = "*";
};

buttonMultiply.addEventListener("click", function() {
    multiplyButtonClicked();
});

function subtractButtonClicked() {
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(currentOperator != "" && currentInputNum != 0) { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    adjustFontSize(displayParaRule, paraDisplayOutput);
    clearBorderOperatorButtons();
    subtractParaRule.style.borderWidth = "0.1em";
    currentOperator = "-";
};

buttonSubtract.addEventListener("click", function() {
    subtractButtonClicked();
});

function sumAll() {
    switch(currentOperator) {
        case "+":
            add();
            break;
        case "/":
            divide();
            break;
        case "*":
            multiply();
            break;
        case "-":
            subtract();
            break;
        case "":
            break;    
    };
    currentOperator = "";
};

let lastSelectedEquals;

function switchOpertator(operator) {
    switch(operator) {
        case "+":
            add();
            adjustFontSize(displayParaRule, paraDisplayOutput);
            break;
        case "/":
            divide();
            adjustFontSize(displayParaRule, paraDisplayOutput);
            break;
        case "*":
            multiply();
            adjustFontSize(displayParaRule, paraDisplayOutput);
            break;
        case "-":
            subtract();
            adjustFontSize(displayParaRule, paraDisplayOutput);
            break;    
    }; 
};

function equalsButtonClicked() {
    lastSelectedEquals = true;
    lastSelectedOperator = false;
    clearBorderOperatorButtons();
    if(currentOperator != "") {
        switchOpertator(currentOperator);
    } else {
        switchOpertator(equalsOperator);
    };
    if(currentOperator != "") { equalsOperator = currentOperator; };
    currentOperator = "";
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonEquals.addEventListener("click", function() {
    equalsButtonClicked();
});

const add = function() {
    makeAllGlobalNumsInt();
    currentSum = currentInputNum + currentSum;
    return paraDisplayOutput.textContent = currentSum;
};

const multiply = function() {
    makeAllGlobalNumsInt();
    currentSum = currentInputNum * currentSum;
    return paraDisplayOutput.textContent = currentSum;
}

const divide = function() {
    makeAllGlobalNumsInt();
    currentSum = currentSum / currentInputNum;
    return paraDisplayOutput.textContent = currentSum;
};

const subtract = function() {
    makeAllGlobalNumsInt();
    currentSum = currentSum - currentInputNum;
    return paraDisplayOutput.textContent = currentSum;
};

function makeAllGlobalNumsInt() {
    currentInputNum = parseFloat(currentInputNum);
    currentSum = parseFloat(currentSum);
};

const displayParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#output-display");

function checkOverflow(el) {
   let curOverflow = el.style.overflow;
   if(!curOverflow || curOverflow === "visible") {
        el.style.overflow = "hidden";
    ;}
   let isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
   el.style.overflow = curOverflow;
   return isOverflowing;
}

const incrementionRate = 0.025

function adjustFontSize(cssRule, el) {
    cssRule.style.fontSize = "3em";
    let fitted = false;
    let lastSize;

    while (!fitted) {
        if(cssRule.style.fontSize <= "0.6em") {
            fitted = true;
        };
        if (checkOverflow(el)) {
            lastSize = parseFloat(cssRule.style.fontSize.slice(0, -2));
            cssRule.style.fontSize = `${lastSize - incrementionRate}em`;
        } else {
            lastSize = parseFloat(cssRule.style.fontSize.slice(0, -2));
            cssRule.style.fontSize = `${lastSize}em`;
            fitted = true;
        }
    }
}

dragElement(container);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("display")) {
        document.getElementById("display").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
  }
}