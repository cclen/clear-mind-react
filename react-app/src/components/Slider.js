import React from "react";
import "./Slider.css";
import DocumentEvents from 'react-document-events';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            isDown: false,
            offset: null,
            knobTopPosition: "-28px",
            containerHeight: "400px"
        };
    }

    grabKnob(event) {
        this.setState(prevState => ({ 
            isDown: true,
            offset: event.target.offsetTop - event.clientY
        }));
    }

    releaseKnob(event) {
        this.setState(prevState => ({ 
            isDown: false
        }));
    }

    moveKnob(event) {
        event.preventDefault();
        let knobOffset;
        let containerHeight = this.state.containerHeight;
        
        if (this.state.isDown) {
            knobOffset = (event.clientY + this.state.offset);
        
            if (knobOffset < -28) {
                this.setState(prevState => ({ 
                    knobTopPosition: "-28px"
                }));
            } else if (
                (containerHeight === "300px" && knobOffset > 239) || 
                (containerHeight === "400px" && knobOffset > 350) || 
                (containerHeight === "500px" && knobOffset > 439)) {
                this.setState(prevState => ({ 
                    knobTopPosition: "calc(100% - 100px)"
                }));
            } else {
                this.setState(prevState => ({ 
                    knobTopPosition: knobOffset + 'px'
                }));
            }
        }
    }
    
    render() {
        const range = this.state.sliderRange;

        const labelsList = range.map( label => <li key={label}>{label} &mdash; </li>);

        return(
            <div>
                <h1>Slider</h1>
                <div className="sliderContainer">
                    <div className="labelsContainer">
                        <ul className="labelsList">
                            {labelsList}
                        </ul>
                        <div className="sliderTrack"></div>
                    </div>
                    
                    <div
                        className="sliderKnob"
                        style={{top: this.state.knobTopPosition}}
                        onMouseDown={e => this.grabKnob(e) }
                    >
                        <div className="horizontalLine"></div>
                    </div>
                </div>
                <DocumentEvents 
                    onMouseUp={e => this.releaseKnob(e) }
                    onMouseMove={e => this.moveKnob(e) }
                />
            </div>
        );
    }
}

export default Slider;
