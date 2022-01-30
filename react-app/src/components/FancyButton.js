// This is just an experiment

import React from "react";
import "./Slider.css";

const CoolButton = React.forwardRef((props, ref) => ( 
    <div ref={ref} className="sliderKnob" style={props.style}>
        {props.children}
    </div>
));

const ref = React.createRef();
class FancyButton extends React.Component {
    render() {
        return(
            <CoolButton ref={ref} style={{backgroundColor: "yellow"}}></CoolButton>  
        )
    }
}

export default FancyButton;