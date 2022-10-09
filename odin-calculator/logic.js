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

buttonAdittionMinus.addEventListener("click", function() {
    if(lastSelectedEquals) {
        currentSum = -currentSum;
        paraDisplayOutput.textContent = currentSum;
    } else {
        currentInputNum = -currentInputNum;
        paraDisplayOutput.textContent = currentInputNum;
        adjustFontSize(displayParaRule, paraDisplayOutput);
    };
});

buttonPercentage.addEventListener("click", function() {
    if(lastSelectedEquals) {
        currentSum = currentSum / 100;
        paraDisplayOutput.textContent = currentSum;
    } else {
        currentInputNum = currentInputNum / 100;
        paraDisplayOutput.textContent = currentInputNum;
        adjustFontSize(displayParaRule, paraDisplayOutput);
    };
});

buttonClear.addEventListener("click", function() {
    clearBorderOperatorButtons();
    displayParaRule.style.fontSize = "3em";
    lastSelectedEquals = false;
    lastSelectedOperator = false;
    recentOperator = "";
    currentOperator = "";
    newInputNum = "";
    currentInputNum = 0;
    currentSum = 0;
    paraDisplayOutput.textContent = currentInputNum;
});

function addListenerMulti(element, eventNames, listener) {
    var events = eventNames.split(' ');
    for (var i=0, iLen=events.length; i<iLen; i++) {
      element.addEventListener(events[i], listener, false);
    }
  }

Array.from(allButtons).forEach(button => {
    addListenerMulti(button, "mousedown touchstart", function() {
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
            case 'operator-buttons':
                buttonRule.style.backgroundColor = 'rgb(192, 129, 45)';
                break;
            case 'equals-button':
                buttonRule.style.backgroundColor = 'rgb(192, 129, 45)';
        }
    });
});

Array.from(allButtons).forEach(button => {
    addListenerMulti(button, "mouseup touchend", function() {
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
            case 'operator-buttons':
                buttonRule.style.backgroundColor = 'rgb(255, 158, 11)';
                break;
            case 'equals-button':
                buttonRule.style.backgroundColor = 'rgb(255, 158, 11)';
        }
    });
});

buttonComma.addEventListener("click", function() {
    innerButtonComma = buttonComma.innerHTML;
    if(!paraDisplayOutput.textContent.includes(".")) {
        paraDisplayOutput.textContent = currentInputNum + innerButtonComma;
    };
    adjustFontSize(displayParaRule, paraDisplayOutput);
});

Array.from(buttonsNumber).forEach(buttonNumber => {
    buttonNumber.addEventListener("click", function() {
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
    };
}

function showCurrentInputNum(currentButtonNum) {
    currentInputNum += currentButtonNum;
    paraDisplayOutput.textContent = currentInputNum;
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

function showCurrentInputWithComma(currentButtonNum) {
    paraDisplayOutput.textContent += currentButtonNum;
    currentInputNum = parseFloat(paraDisplayOutput.textContent);
    paraDisplayOutput.textContent = currentInputNum;
    adjustFontSize(displayParaRule, paraDisplayOutput);
};

buttonZero.addEventListener("click", function() {
    if(currentInputNum == 0) {} else {
        if(lastSelectedOperator) {
            currentInputNum += "0";
            paraDisplayOutput.textContent = currentInputNum;
        } else {
            currentInputNum = 0;
            paraDisplayOutput.textContent = currentInputNum;
        };
    }
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
}

buttonAdittion.addEventListener("click", function() {
    if(currentOperator == "+") { recentOperator = currentOperator };
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(recentOperator == "+") { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    clearBorderOperatorButtons();
    adittionParaRule.style.borderWidth = "0.1em";
    currentOperator = "+";
});

buttonDivide.addEventListener("click", function() {
    if(currentOperator == "/") { recentOperator = currentOperator };
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(recentOperator == "/") { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    clearBorderOperatorButtons();
    divideParaRule.style.borderWidth = "0.1em";
    currentOperator = "/";
});

buttonMultiply.addEventListener("click", function() {
    if(currentOperator == "*") { recentOperator = currentOperator };
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(recentOperator == "*") { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    clearBorderOperatorButtons();
    multiplyParaRule.style.borderWidth = "0.1em";
    currentOperator = "*";
});

buttonSubtract.addEventListener("click", function() {
    if(currentOperator == "-") { recentOperator = currentOperator };
    lastSelectedEquals = false;
    lastSelectedOperator = true;
    makeAllGlobalNumsInt();
    if(recentOperator == "-") { sumAll() };
    if(currentSum == 0) { currentSum = currentInputNum; };
    currentInputNum = 0;
    clearBorderOperatorButtons();
    subtractParaRule.style.borderWidth = "0.1em";
    currentOperator = "-";
});

function sumAll() {
    switch(recentOperator) {
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
        case "":
            break;    
    }
    recentOperator = "";
}

let recentOperator;
let lastSelectedEquals;

buttonEquals.addEventListener("click", function() {
    lastSelectedEquals = true;
    lastSelectedOperator = false;
    clearBorderOperatorButtons();
    switch(currentOperator) {
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
    }
});

const add = function() {
    makeAllGlobalNumsInt();
    currentSum = currentInputNum + currentSum;
    return paraDisplayOutput.textContent = currentSum;
}

const multiply = function() {
    makeAllGlobalNumsInt();
    currentSum = currentInputNum * currentSum;
    return paraDisplayOutput.textContent = currentSum;
}

const divide = function() {
    makeAllGlobalNumsInt();
    currentSum = currentSum / currentInputNum;
    return paraDisplayOutput.textContent = currentSum;
}

const subtract = function() {
    makeAllGlobalNumsInt();
    currentSum = currentSum - currentInputNum;
    return paraDisplayOutput.textContent = currentSum;
}

function makeAllGlobalNumsInt() {
    currentInputNum = parseFloat(currentInputNum);
    currentSum = parseFloat(currentSum);
}

const displayParaRule = [...stylesheet.cssRules].find((r) => r.selectorText === "#output-display");

function checkOverflow(el) {
   let curOverflow = el.style.overflow;
   if (!curOverflow || curOverflow === "visible") {
        el.style.overflow = "hidden";
    }
   let isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
   el.style.overflow = curOverflow;
   return isOverflowing;
}

const incrementionRate = 0.05 // To augment 0.05em in every iteration

function adjustFontSize(cssRule, el) {
    let fitted = false;
    let lastSize;
    if(cssRule.style.fontSize == "0.5em") {
        return fitted = true;
    }
    while (!fitted) {
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
    // if present, the header is where you move the DIV from:
    document.getElementById("display").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}