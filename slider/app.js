const sliderContainer = document.getElementById("slider-container");
const sliderKnob = document.getElementById("slider-knob");
const labelsList = document.getElementById("labels-list");
let isDown = false;
let containerHeight;

function writeSliderRange(arr) {
    //pass range array stored in a variable as an argument
    //loop through range array - create a div for each value of the array - append those divs to the DOM inside the parent element of labels (labelsList)
    // since the will receive an array in increasing order, we need to loop throught he array backwards to append the numbers in decreasing order to the track (highest number on top)
    let newLabel;
    for(let i = arr.length-1; i >= 0; i--) {
        newLabel = document.createElement("li");
        newLabel.innerHTML = arr[i] + " &mdash; ";
        labelsList.appendChild(newLabel);
    }
}

const setDefaultPositon = function(pos) {
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

const applySliderConfigs = function (color, size, range, defaultPosition) {
    // set Slider Knob background color
    sliderKnob.style.backgroundColor = color;
    
    // set the Slider size by updating container height
    if (size === "medium") {
        containerHeight = "400px";
    } else if (size === "small") {
        containerHeight = "300px";
    } else if (size === "large") {
        containerHeight = "500px";
    }
    sliderContainer.style.height = containerHeight;

    // Set the Range of the Slider
    writeSliderRange(range);

    //set default position of Slider Knob (max, middle, min)
    setDefaultPositon(defaultPosition);
}

const rangeArray1 = [0, 20, 40, 60, 80, 100];
const rangeArray2 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

applySliderConfigs("aqua", "medium", rangeArray2, "middle");

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

sliderKnob.addEventListener("mousedown", grabKnob);
sliderKnob.addEventListener("mouseup", releaseKnob);
document.addEventListener("mousemove", moveKnob);

