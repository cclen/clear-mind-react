
const sliderKnob = document.getElementById("slider-knob");
let isDown = false;


const grabKnob = function(event) {
    isDown = true;
    offset = sliderKnob.offsetTop - event.clientY;
}

const releaseKnob = function() {
    isDown = false;
}

const moveKnob = function(event) {
    event.preventDefault();
    if (isDown) {
        sliderKnob.style.top  = (event.clientY + offset) + 'px';
    }
}


sliderKnob.addEventListener("mousedown", grabKnob);
sliderKnob.addEventListener("mouseup", releaseKnob);
sliderKnob.addEventListener("mouseleave", releaseKnob);
sliderKnob.addEventListener("mousemove", moveKnob);

