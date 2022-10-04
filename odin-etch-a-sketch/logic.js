const container = document.getElementById("container");
const colorInput = document.querySelector("#colorInput");
const gridItems = document.getElementsByClassName("grid-items");
const gridItem = gridItems[0];
const elementGridInput = document.querySelector('#gridInputSlider');
const buttonClear = document.querySelector('#clearSketch');
const buttonRainbow = document.querySelector('#rainbowButton');
const labelGridInput = document.querySelector('#labelGridInput');
const whiteToBlackButton = document.querySelector('#whiteToBlackButton');
const gridDrawnCheckbox =  document.querySelector('#gridDrawn');
let randomColor = Math.floor(Math.random()*16777215).toString(16);
let isMousedown = false;
let useRainbow = false;
let useWhiteToBlack = false;
let useColor = true;

addGridDiv(16*16);

function addGridDiv(number) {
    Array(number).fill(1).forEach(()=>{
        const newDiv = document.createElement("div");
        newDiv.classList.add("grid-items");
        const currentDiv = document.getElementById("div1");
        container.insertBefore(newDiv, currentDiv);
    });
};

elementGridInput.addEventListener("change", function() {
    container.innerHTML = "";
    labelGridInput.innerHTML = "";
    gridValue = parseInt(elementGridInput.value);
    labelGridInput.innerHTML = `Grid: ${gridValue} x ${gridValue}`;
    container.style.setProperty('--grid', `${gridValue}`);
    addGridDiv(gridValue*gridValue);
});

container.addEventListener("mousedown", function(e) {
    isMousedown = true;
    e = e || window.event;
    evt = e;
    if(evt.target != gridItem) {
        switch (true) {
            case useRainbow:
                evt.target.style.setProperty('background-color', `#${randomColor}`);
                break;
            case useWhiteToBlack:
                rgbValue = calcBlackToWhiteRGB();
                roundedValue = Math.round(rgbValue);
                evt.target.style.setProperty('background-color', `rgb(${roundedValue},${roundedValue},${roundedValue})`);
                break;
            default:
                evt.target.style.setProperty('background-color', `${colorInput.value}`);
        }
    };
});

window.addEventListener("mouseup", function() {
    isMousedown = false;
});

let rgbValue = 255;

function calcBlackToWhiteRGB() {
    if(rgbValue < 1) {
        rgbValue = 0;
    }
    if(rgbValue == 0) {
        rgbValue = 255;
    }
    rgbValue = rgbValue-(255*0.075);
    return rgbValue;
}
    
container.addEventListener("mouseover", function(e) {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    if (isMousedown) {
    e = e || window.event;
    evt = e;
    if(evt.target != gridItem) {
        switch (true) {
            case useRainbow:
                evt.target.style.setProperty('background-color', `#${randomColor}`);
                break;
            case useWhiteToBlack:
                rgbValue = calcBlackToWhiteRGB();
                roundedValue = Math.round(rgbValue);
                evt.target.style.setProperty('background-color', `rgb(${roundedValue},${roundedValue},${roundedValue})`);
                break;
            default:
                evt.target.style.setProperty('background-color', `${colorInput.value}`);
            }
        };
    };
});
    
buttonClear.addEventListener("click", function() {
    rgbValue = 255;
    container.innerHTML = "";
    gridValue = parseInt(elementGridInput.value);
    addGridDiv(gridValue*gridValue);
});

buttonRainbow.addEventListener("click", function() {
    if(useRainbow == false) {
        useRainbow = true;
        useWhiteToBlack = false;
        useColor = false;
    } else {
        useRainbow = false;
    };
    if(useRainbow == true) {
        buttonRainbow.style.setProperty('background-image', 'linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)');
        whiteToBlackButton.style.setProperty('background-image', 'none');
    } else {
        buttonRainbow.style.setProperty('background-image', 'none');
    };
});

whiteToBlackButton.addEventListener("click", function() {
    if(useWhiteToBlack == false) {
        useWhiteToBlack = true;
        useRainbow = false;
        useColor = false;
    } else {
        useWhiteToBlack = false;
    };
    if(useWhiteToBlack == true) {
        whiteToBlackButton.style.setProperty('background-image', 'linear-gradient(to right, white,black)');
        buttonRainbow.style.setProperty('background-image', 'none');
    } else {
        whiteToBlackButton.style.setProperty('background-image', 'none');
    };
});

colorInput.addEventListener("change", function() {
    if(useColor == false) {
        useColor = true;
        useRainbow = false;
        useWhiteToBlack = false;
    } else {
        useColor = false;
    };
    if(useColor == true) {
        whiteToBlackButton.style.setProperty('background-image', 'none');
        buttonRainbow.style.setProperty('background-image', 'none');
    };
});

const stylesheet = document.styleSheets[0];
const gridItemsRule = [...stylesheet.cssRules].find((r) => r.selectorText === ".grid-items");

gridDrawnCheckbox.addEventListener("change", function() {
    if(gridDrawnCheckbox.checked == true) {
        gridItemsRule.style.setProperty('border', '0.01px solid #ccc');
    } else {
        gridItemsRule.style.setProperty('border', 'none');
    }
});