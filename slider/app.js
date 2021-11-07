const sliderContainer = document.getElementById("slider-container");
const sliderKnob = document.getElementById("slider-knob");
const labelsList = document.getElementById("labels-list");
let isDown = false;
let containerHeight;
let knobColor;
let sliderSize;
let knobPosition;

function writeSliderRange(arr) {
    // Pass range array stored in a variable as an argument.
    // Loop through range array - create a div for each value of the array - append those divs to the DOM inside the parent element of labels (labelsList).
    // Since the will receive an array in increasing order, we need to loop throught he array backwards to append the numbers in decreasing order to the track (highest number on top).

    let newLabel;
    for(let i = arr.length-1; i >= 0; i--) {
        newLabel = document.createElement("li");
        newLabel.innerHTML = arr[i] + " &mdash; ";
        labelsList.appendChild(newLabel);
    }
}

const setDefaultPositon = function(pos) {
    // Set default position of Slider Knob (max, middle, min)
    let topPosition;
    if (pos === "max") {
        topPosition = "-43px";
    } else if (pos === "middle") {
        topPosition = "calc(50% - 52px)";
    } else if (pos === "min") {
        topPosition = "calc(100% - 60px)";
    }

    sliderKnob.style.top = topPosition;
}

const setKnobColor = function(color) {
    // Set Slider Knob background color
    sliderKnob.style.backgroundColor = color;
}

const setSliderSize = function(size) {
    // Set the Slider size by updating container height
    if (size === "medium") {
        containerHeight = "400px";
    } else if (size === "small") {
        containerHeight = "300px";
    } else if (size === "large") {
        containerHeight = "500px";
    }
    sliderContainer.style.height = containerHeight;
}

const applySliderConfigs = function (color, size, range, defaultPosition) {
    setKnobColor(color);
    setSliderSize(size);
    writeSliderRange(range);
    setDefaultPositon(defaultPosition);
}

const rangeArray1 = [0, 20, 40, 60, 80, 100];
const rangeArray2 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

applySliderConfigs("", "", rangeArray2, "middle");


// Knob Movements

const grabKnob = function(event) {
    isDown = true;
    offset = sliderKnob.offsetTop - event.clientY;
}

const releaseKnob = function() {
    isDown = false;
}

const moveKnob = function(event) {
    event.preventDefault();
    let knobOffset;
    
    if (isDown) {
        knobOffset = (event.clientY + offset);
        
        if (knobOffset < -43) {
            sliderKnob.style.top = "-43px";
        } else if (
            (containerHeight === "300px" && knobOffset > 239) || 
            (containerHeight === "400px" && knobOffset > 339) || 
            (containerHeight === "500px" && knobOffset > 439)) {
           
            sliderKnob.style.top = "calc(100% - 60px)";
        } else {
            sliderKnob.style.top  =  knobOffset + 'px';
        } 
    }
}


// CONFIG PANEL

const getColorValue = function() {
    const colors = document.getElementsByName('color');
      
    for(i = 0; i < colors.length; i++) {
        if(colors[i].checked)
        knobColor = colors[i].value;
    }
}

const getSizeValue = function() {
    const sizes = document.getElementsByName('size');
      
    for(i = 0; i < sizes.length; i++) {
        if(sizes[i].checked)
        sliderSize = sizes[i].value;
    }
}

const getDefaultPositionValue = function() {
    const positions = document.getElementsByName('position');
      
    for(i = 0; i < positions.length; i++) {
        if(positions[i].checked)
        knobPosition = positions[i].value;
    }
}

const applyUserConfig = function() {
    getColorValue();
    getSizeValue();
    getDefaultPositionValue();
    
    applySliderConfigs(knobColor, sliderSize, [], knobPosition);
}

sliderKnob.addEventListener("mousedown", grabKnob);
sliderKnob.addEventListener("mouseup", releaseKnob);
document.addEventListener("mousemove", moveKnob);

