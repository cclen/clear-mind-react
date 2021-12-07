const sliderContainer = document.getElementById("slider-container");
const sliderKnob = document.getElementById("slider-knob");
const labelsList = document.getElementById("labels-list");
let isDown = false;
let containerHeight;


const sliderConfigs = {
    knobColor: "#d5d5d5",
    sliderSize: "medium",
    sliderRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    knobPosition: "middle"
}

const writeSliderRange = arr => {
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

const setDefaultPositon = pos => {
    // Set default position of Slider Knob (max, middle, min)
    let topPosition;
    if (pos === "max") {
        topPosition = "-39px";
    } else if (pos === "middle") {
        topPosition = "calc(50% - 50px)";
    } else if (pos === "min") {
        topPosition = "calc(100% - 61px)";
    }

    sliderKnob.style.top = topPosition;
}

const setKnobColor = color => {
    // Set Slider Knob background color
    sliderKnob.style.backgroundColor = color;
    sliderConfigs.knobColor = color;
}

const setSliderSize = size => {
    // Set the Slider size by updating container height
    if (size === "medium") {
        containerHeight = "400px";
    } else if (size === "small") {
        containerHeight = "300px";
    } else if (size === "large") {
        containerHeight = "500px";
    }
    sliderContainer.style.height = containerHeight;
    sliderConfigs.sliderSize = size;
}

const applySliderConfigs = obj => {
    setKnobColor(obj.knobColor);
    setSliderSize(obj.sliderSize);
    writeSliderRange(obj.sliderRange);
    setDefaultPositon(obj.knobPosition);
}

// DEFAULT UI SETTINGS
applySliderConfigs(sliderConfigs);


// KNOB MOVEMENTS

const grabKnob = event => {
    isDown = true;
    offset = sliderKnob.offsetTop - event.clientY;
}

const releaseKnob = () => {
    isDown = false;
}

const moveKnob = event => {
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

const updateColorValue = () => {
    const colors = document.getElementsByName('color');
      
    for(i = 0; i < colors.length; i++) {
        if(colors[i].checked)
        sliderConfigs.knobColor = colors[i].value;
    }
}

const updateSizeValue = () => {
    const sizes = document.getElementsByName('size');
      
    for(i = 0; i < sizes.length; i++) {
        if(sizes[i].checked)
        sliderConfigs.sliderSize = sizes[i].value;
    }
}

const updateDefaultPositionValue = () => {
    const positions = document.getElementsByName('position');
      
    for(i = 0; i < positions.length; i++) {
        if(positions[i].checked)
        sliderConfigs.knobPosition = positions[i].value;
    }
}

const generateRange = (firstNum, lastNum) => {
    firstNum = parseInt(firstNum);
    lastNum = parseInt(lastNum);
    let range = [];
    
    for(let i = firstNum; i <= lastNum; i+=10) {
       range.push(i);
    }

    sliderConfigs.sliderRange = range;
}

const updateRangeValue = () => {
    const firstNumber = document.getElementById("first-number").value;
    const lastNumber = document.getElementById("last-number").value;

    generateRange(firstNumber, lastNumber);
}

const removePreviousRange = () => {
    // Remove all list items before generating new list
    var previousLabelsArr = labelsList.querySelectorAll("li");

    for (let i = 0; i < previousLabelsArr.length; i++) {
        let elem = previousLabelsArr[i];
        elem.parentElement.removeChild(elem);
    }
}

const applyUserConfig = () => {
    updateColorValue();
    updateSizeValue();
    updateDefaultPositionValue();
    removePreviousRange();
    updateRangeValue();
    
    applySliderConfigs(sliderConfigs);
}

sliderKnob.addEventListener("mousedown", grabKnob);
document.addEventListener("mouseup", releaseKnob);
document.addEventListener("mousemove", moveKnob);
