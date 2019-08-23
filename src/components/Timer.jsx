import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            <div>
                <div>{this.props.timerLeft}</div>
                <button id="start-stop">

                </button>
                <button id="reset">

                </button>

            </div>
        )
    }
}

export default Timer;