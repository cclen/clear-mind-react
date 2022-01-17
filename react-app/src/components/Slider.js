import React from "react";

import "./Slider.css";

const sliderConfigs = {
    knobColor: "#d5d5d5",
    sliderSize: "medium",
    sliderRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    knobPosition: "middle"
}

class Slider extends React.Component {
    render() {
        const range = sliderConfigs.sliderRange;

        const labelsList = range.map((label)=>{
            return <li>{label} &mdash; </li>;
        });

        return(
            <div>
                <h1>Slider</h1>
                <div class="sliderContainer">
                    <div class="labelsContainer">
                        <ul class="labelsList">
                            {labelsList}
                        </ul>
                        <div class="slider-track"></div>
                    </div>
                    <div id="slider-knob">
                        <div class="horizontal-line"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Slider;